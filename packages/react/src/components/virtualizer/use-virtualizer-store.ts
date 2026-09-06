'use client'

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'

interface VirtualizerLike {
  subscribe: (listener: VoidFunction) => VoidFunction
  getSnapshot: () => number
  destroy: () => void
  init: (element: HTMLElement) => void
}

export type VirtualizerRef = (element: HTMLElement | null) => void

export function useVirtualizerStore<T extends VirtualizerLike>(create: () => T): T & { ref: VirtualizerRef } {
  const [virtualizer] = useState(create)
  useSyncExternalStore(virtualizer.subscribe, virtualizer.getSnapshot, () => 0)

  const ref = useCallback<VirtualizerRef>(
    (element) => {
      if (element) virtualizer.init(element)
    },
    [virtualizer],
  )

  useEffect(() => () => virtualizer.destroy(), [virtualizer])

  return Object.assign(virtualizer, { ref })
}
