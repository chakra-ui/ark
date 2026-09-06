import type { ListVirtualizer } from '@zag-js/virtualizer'
import { createContext } from '../../utils/create-context.ts'

export interface UseListVirtualizerContext extends ListVirtualizer {}

export const [ListVirtualizerProvider, useListVirtualizerContext] = createContext<UseListVirtualizerContext>({
  hookName: 'useListVirtualizerContext',
  providerName: '<ListVirtualizer.Root />',
})
