import { useSyncExternalStore } from '@zag-js/svelte'
import { onDestroy } from 'svelte'

interface VirtualizerLike {
  subscribe: (listener: VoidFunction) => VoidFunction
  getSnapshot: () => number
  destroy: () => void
  init: (element: HTMLElement) => void
}

export type VirtualizerRef = (element: HTMLElement | null) => void

export function useVirtualizerStore<T extends VirtualizerLike>(create: () => T): T & { ref: VirtualizerRef } {
  const virtualizer = create()
  const snapshot = useSyncExternalStore(virtualizer.subscribe, virtualizer.getSnapshot)

  onDestroy(() => virtualizer.destroy())

  let scrollElement: HTMLElement | null = null

  const ref: VirtualizerRef = (element) => {
    if (!element || element === scrollElement) return
    scrollElement = element
    virtualizer.init(element)
  }

  const bound = new Map<PropertyKey, unknown>()

  return new Proxy(virtualizer, {
    get(target, prop, receiver) {
      if (prop === 'ref') return ref
      snapshot()
      const value = Reflect.get(target, prop, receiver)
      if (typeof value !== 'function') return value
      if (!bound.has(prop)) bound.set(prop, value.bind(target))
      return bound.get(prop)
    },
    has(target, prop) {
      return prop === 'ref' || Reflect.has(target, prop)
    },
  }) as T & { ref: VirtualizerRef }
}
