import type { GridVirtualizer } from '@zag-js/virtualizer'
import { createContext } from '../../utils/create-context.ts'

export interface UseGridVirtualizerContext extends GridVirtualizer {}

export const [GridVirtualizerProvider, useGridVirtualizerContext] = createContext<UseGridVirtualizerContext>({
  hookName: 'useGridVirtualizerContext',
  providerName: '<GridVirtualizer.Root />',
})
