'use client'

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react'

interface VirtualizerLike {
  subscribe: (listener: VoidFunction) => VoidFunction
  getSnapshot: () => number
  destroy: () => void
  init: (element: HTMLElement) => void
}

export type VirtualizerRef = (element: HTMLElement | null) => void

const createView = <T extends VirtualizerLike>(virtualizer: T, ref: VirtualizerRef) =>
  new Proxy(virtualizer, {
    get(target, key) {
      if (key === 'ref') return ref
      const value = Reflect.get(target, key, target)
      return typeof value === 'function' ? value.bind(target) : value
    },
  }) as T & { ref: VirtualizerRef }

export function useVirtualizerStore<T extends VirtualizerLike>(create: () => T): T & { ref: VirtualizerRef } {
  const [virtualizer] = useState(create)
  const version = useSyncExternalStore(virtualizer.subscribe, virtualizer.getSnapshot, () => 0)

  const ref = useCallback<VirtualizerRef>(
    (element) => {
      if (element) virtualizer.init(element)
    },
    [virtualizer],
  )

  useEffect(() => () => virtualizer.destroy(), [virtualizer])

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  return useMemo(() => createView(virtualizer, ref), [virtualizer, ref, version])
}
