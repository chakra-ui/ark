'use client'

import type { ListVirtualizer } from '@zag-js/virtualizer'
import { useSyncExternalStore } from 'react'
import { createContext } from '../../utils/create-context.ts'

export interface UseListVirtualizerContext extends ListVirtualizer {}

const [ListVirtualizerProvider, useBaseListVirtualizerContext] = createContext<UseListVirtualizerContext>({
  name: 'ListVirtualizerContext',
  hookName: 'useListVirtualizerContext',
  providerName: '<ListVirtualizer.Root />',
})

export { ListVirtualizerProvider }

export function useListVirtualizerContext(): UseListVirtualizerContext {
  const virtualizer = useBaseListVirtualizerContext()
  useSyncExternalStore(virtualizer.subscribe, virtualizer.getSnapshot, () => 0)
  return virtualizer
}
