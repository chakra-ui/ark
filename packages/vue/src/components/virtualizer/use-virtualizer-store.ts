import { useSyncExternalStore } from '@zag-js/vue'
import { type ComponentPublicInstance, nextTick, onUnmounted } from 'vue'

interface VirtualizerLike {
  subscribe: (listener: VoidFunction) => VoidFunction
  getSnapshot: () => number
  destroy: () => void
  init: (element: HTMLElement) => void
}

export type VirtualizerRef = (element: Element | ComponentPublicInstance | null) => void

export function useVirtualizerStore<T extends VirtualizerLike>(create: () => T): T & { ref: VirtualizerRef } {
  const virtualizer = create()
  const snapshot = useSyncExternalStore(virtualizer.subscribe, virtualizer.getSnapshot)

  onUnmounted(() => virtualizer.destroy())

  let scrollElement: HTMLElement | null = null

  const ref: VirtualizerRef = (element) => {
    const node = element && '$el' in element ? element.$el : element
    if (!(node instanceof HTMLElement) || node === scrollElement) return
    scrollElement = node
    if (node.isConnected) return virtualizer.init(node)
    nextTick(() => {
      if (scrollElement === node && node.isConnected) virtualizer.init(node)
    })
  }

  const bound = new Map<PropertyKey, unknown>()

  return new Proxy(virtualizer, {
    get(target, prop, receiver) {
      if (prop === 'ref') return ref
      void snapshot.value
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
