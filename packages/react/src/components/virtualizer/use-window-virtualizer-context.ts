'use client'

import type { WindowVirtualizer } from '@zag-js/virtualizer'
import { useSyncExternalStore } from 'react'
import { createContext } from '../../utils/create-context.ts'

export interface UseWindowVirtualizerContext extends WindowVirtualizer {}

const [WindowVirtualizerProvider, useBaseWindowVirtualizerContext] = createContext<UseWindowVirtualizerContext>({
  name: 'WindowVirtualizerContext',
  hookName: 'useWindowVirtualizerContext',
  providerName: '<WindowVirtualizer.Root />',
})

export { WindowVirtualizerProvider }

export function useWindowVirtualizerContext(): UseWindowVirtualizerContext {
  const virtualizer = useBaseWindowVirtualizerContext()
  useSyncExternalStore(virtualizer.subscribe, virtualizer.getSnapshot, () => 0)
  return virtualizer
}
