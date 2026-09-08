import { useSyncExternalStore } from '@zag-js/solid'
import { createComputed, createMemo, onCleanup, onMount, untrack } from 'solid-js'
import type { MaybeAccessor } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'

interface VirtualizerLike<Options> {
  subscribe: (listener: VoidFunction) => VoidFunction
  getSnapshot: () => number
  destroy: () => void
  init: (element: HTMLElement) => void
  updateOptions: (options: Partial<Options>) => void
}

export type VirtualizerRef = (element: HTMLElement | null) => void

export function useVirtualizerStore<Options extends object, T extends VirtualizerLike<Options>>(
  props: MaybeAccessor<Options>,
  create: (options: Options) => T,
): T & { ref: VirtualizerRef } {
  const options = createMemo(() => runIfFn(props))
  let applied = untrack(options)
  const virtualizer = create(applied)
  const snapshot = useSyncExternalStore(virtualizer.subscribe, virtualizer.getSnapshot)

  const sync = () => {
    const next = options()
    if (next === applied) return
    applied = next
    untrack(() => virtualizer.updateOptions(next))
  }

  createComputed(sync)

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
      sync()
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
