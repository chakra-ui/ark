import type { WindowVirtualizer } from '@zag-js/virtualizer'
import { createContext } from '../../utils/create-context.ts'

export interface UseWindowVirtualizerContext extends WindowVirtualizer {}

export const [WindowVirtualizerProvider, useWindowVirtualizerContext] = createContext<UseWindowVirtualizerContext>({
  hookName: 'useWindowVirtualizerContext',
  providerName: '<WindowVirtualizer.Root />',
})
