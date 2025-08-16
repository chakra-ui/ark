import type { ScrollbarProps } from '@zag-js/scroll-area'
import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context'

export const [ScrollAreaScrollbarProvider, useScrollAreaScrollbarContext] = createContext<Accessor<ScrollbarProps>>({
  hookName: 'useScrollAreaScrollbarContext',
  providerName: '<ScrollAreaScrollbarProvider />',
})
