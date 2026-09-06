import { useSyncExternalStore } from '@zag-js/solid'
import { onCleanup, onMount } from 'solid-js'

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

  let scrollElement: HTMLElement | null = null
  let mounted = false

  onMount(() => {
    mounted = true
    if (scrollElement) virtualizer.init(scrollElement)
  })

  onCleanup(() => virtualizer.destroy())

  const ref: VirtualizerRef = (element) => {
    if (!element || element === scrollElement) return
    scrollElement = element
    if (!mounted) return
    if (element.isConnected) return virtualizer.init(element)
    queueMicrotask(() => {
      if (scrollElement === element && element.isConnected) virtualizer.init(element)
    })
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
