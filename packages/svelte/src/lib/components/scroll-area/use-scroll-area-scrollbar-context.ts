import type { Accessor } from '$lib/types.js'
import type { ScrollbarProps } from '@zag-js/scroll-area'
import { createContext } from '../../utils/create-context.js'

export const [ScrollAreaScrollbarProvider, useScrollAreaScrollbarContext] = createContext<Accessor<ScrollbarProps>>({
  name: 'ScrollAreaScrollbarContext',
  hookName: 'useScrollAreaScrollbarContext',
  providerName: '<ScrollAreaScrollbarProvider />',
})
