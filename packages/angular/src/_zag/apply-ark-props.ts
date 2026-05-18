import { effect } from '@angular/core'
import type { ApplyArkPropsOptions } from '../internal/types'

const isAttributeKey = (key: string): boolean =>
  key === 'role' || key === 'id' || key === 'tabindex' || key.startsWith('aria-') || key.startsWith('data-')

const eventNameFromHandlerKey = (key: string): string | undefined => {
  if (!/^on[A-Z]/.test(key)) return undefined
  return key.slice(2).toLowerCase()
}

const isClassKey = (key: string): boolean => key === 'class' || key === 'className'

const isStyleKey = (key: string): boolean => key === 'style'

const tokenizeClassString = (value: string): string[] => value.split(/\s+/).filter((token) => token.length > 0)

const parseStyleString = (value: string): Record<string, string> => {
  const result: Record<string, string> = {}
  for (const part of value.split(';')) {
    const trimmed = part.trim()
    if (trimmed.length === 0) continue
    const colon = trimmed.indexOf(':')
    if (colon < 0) continue
    const name = trimmed.slice(0, colon).trim()
    const styleValue = trimmed.slice(colon + 1).trim()
    if (name.length === 0) continue
    result[name] = styleValue
  }
  return result
}

const computeClassSet = (value: unknown): Set<string> => {
  const result = new Set<string>()
  if (value == null || value === false) return result
  if (typeof value === 'string') {
    for (const token of tokenizeClassString(value)) result.add(token)
    return result
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      if (typeof item === 'string' && item.length > 0) result.add(item)
    }
    return result
  }
  if (typeof value === 'object') {
    const entries = value as Record<string, unknown>
    for (const key of Object.keys(entries)) {
      if (entries[key]) result.add(key)
    }
    return result
  }
  return result
}

const computeStyleMap = (value: unknown): Map<string, string> => {
  const result = new Map<string, string>()
  if (value == null || value === false) return result
  if (typeof value === 'string') {
    for (const [name, styleValue] of Object.entries(parseStyleString(value))) {
      result.set(name, styleValue)
    }
    return result
  }
  if (typeof value === 'object') {
    const entries = value as Record<string, unknown>
    for (const key of Object.keys(entries)) {
      const styleValue = entries[key]
      if (styleValue == null || styleValue === false) continue
      result.set(key, String(styleValue))
    }
    return result
  }
  return result
}

export function applyArkProps(options: ApplyArkPropsOptions): void {
  const { elementRef, renderer, destroyRef } = options

  let prev: Record<string, unknown> = {}
  // Tracks listeners this helper installed so we can dispose them precisely
  // on update (handler swap) and on destroy.
  const listeners = new Map<string, () => void>()
  // Tracks classes/styles this helper added so the diff never removes
  // consumer-owned tokens that originated outside applyArkProps.
  const appliedClasses = new Set<string>()
  const appliedStyles = new Set<string>()

  const removeListener = (eventName: string): void => {
    const dispose = listeners.get(eventName)
    if (!dispose) return
    dispose()
    listeners.delete(eventName)
  }

  const removeAttribute = (el: HTMLElement, key: string): void => {
    renderer.removeAttribute(el, key)
  }

  const removeProperty = (el: HTMLElement, key: string): void => {
    renderer.setProperty(el, key, '')
  }

  const applyClasses = (el: HTMLElement, nextValue: unknown): void => {
    const nextSet = computeClassSet(nextValue)
    for (const token of appliedClasses) {
      if (!nextSet.has(token)) {
        renderer.removeClass(el, token)
        appliedClasses.delete(token)
      }
    }
    for (const token of nextSet) {
      if (!appliedClasses.has(token)) {
        renderer.addClass(el, token)
        appliedClasses.add(token)
      }
    }
  }

  const removeAllClasses = (el: HTMLElement): void => {
    for (const token of appliedClasses) {
      renderer.removeClass(el, token)
    }
    appliedClasses.clear()
  }

  const applyStyles = (el: HTMLElement, nextValue: unknown): void => {
    const nextMap = computeStyleMap(nextValue)
    for (const name of appliedStyles) {
      if (!nextMap.has(name)) {
        renderer.removeStyle(el, name)
        appliedStyles.delete(name)
      }
    }
    for (const [name, styleValue] of nextMap) {
      renderer.setStyle(el, name, styleValue)
      appliedStyles.add(name)
    }
  }

  const removeAllStyles = (el: HTMLElement): void => {
    for (const name of appliedStyles) {
      renderer.removeStyle(el, name)
    }
    appliedStyles.clear()
  }

  effect(() => {
    const el = elementRef.nativeElement
    if (!el) return
    const next = (options.props() ?? {}) as Record<string, unknown>

    for (const key of Object.keys(next)) {
      const nextValue = next[key]
      const prevValue = prev[key]

      const eventName = eventNameFromHandlerKey(key)
      if (eventName && typeof nextValue === 'function') {
        if (prevValue === nextValue) continue
        removeListener(eventName)
        const dispose = renderer.listen(el, eventName, nextValue as (event: Event) => void)
        listeners.set(eventName, dispose)
        continue
      }
      if (eventName && listeners.has(eventName) && typeof nextValue !== 'function') {
        removeListener(eventName)
        if (nextValue == null || nextValue === false) continue
      }

      if (isClassKey(key)) {
        if (Object.is(prevValue, nextValue)) continue
        applyClasses(el, nextValue)
        continue
      }

      if (isStyleKey(key)) {
        if (Object.is(prevValue, nextValue)) continue
        applyStyles(el, nextValue)
        continue
      }

      if (isAttributeKey(key)) {
        if (nextValue == null || nextValue === false) {
          if (prevValue !== undefined && prevValue !== null && prevValue !== false) {
            removeAttribute(el, key)
          }
          continue
        }
        if (Object.is(prevValue, nextValue)) continue
        renderer.setAttribute(el, key, String(nextValue))
        continue
      }

      if (nextValue == null) {
        if (prevValue !== undefined && prevValue !== null) {
          removeProperty(el, key)
        }
        continue
      }

      if (Object.is(prevValue, nextValue)) continue
      renderer.setProperty(el, key, nextValue)
    }

    for (const key of Object.keys(prev)) {
      if (key in next) continue
      const prevValue = prev[key]

      const eventName = eventNameFromHandlerKey(key)
      if (eventName && typeof prevValue === 'function') {
        removeListener(eventName)
        continue
      }

      if (isClassKey(key)) {
        applyClasses(el, undefined)
        continue
      }

      if (isStyleKey(key)) {
        applyStyles(el, undefined)
        continue
      }

      if (isAttributeKey(key)) {
        removeAttribute(el, key)
        continue
      }

      removeProperty(el, key)
    }

    prev = { ...next }
  })

  destroyRef.onDestroy(() => {
    const el = elementRef.nativeElement
    for (const dispose of listeners.values()) {
      dispose()
    }
    listeners.clear()
    if (el) {
      removeAllClasses(el)
      removeAllStyles(el)
    }
    prev = {}
  })
}
