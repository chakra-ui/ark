'use client'

import type { GridVirtualizer } from '@zag-js/virtualizer'
import { useSyncExternalStore } from 'react'
import { createContext } from '../../utils/create-context.ts'

export interface UseGridVirtualizerContext extends GridVirtualizer {}

const [GridVirtualizerProvider, useBaseGridVirtualizerContext] = createContext<UseGridVirtualizerContext>({
  name: 'GridVirtualizerContext',
  hookName: 'useGridVirtualizerContext',
  providerName: '<GridVirtualizer.Root />',
})

export { GridVirtualizerProvider }

export function useGridVirtualizerContext(): UseGridVirtualizerContext {
  const virtualizer = useBaseGridVirtualizerContext()
  useSyncExternalStore(virtualizer.subscribe, virtualizer.getSnapshot, () => 0)
  return virtualizer
}
