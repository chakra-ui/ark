import type { ScrollbarProps } from '@zag-js/scroll-area'
import { createContext } from '../../utils/create-context'

export const [ScrollAreaScrollbarProvider, useScrollAreaScrollbarContext] = createContext<ScrollbarProps>({
  hookName: 'useScrollAreaScrollbarContext',
  providerName: '<ScrollAreaScrollbarProvider />',
})
