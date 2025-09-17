import type { ScrollbarProps } from '@zag-js/scroll-area'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'

export const [ScrollAreaScrollbarPropsProvider, useScrollAreaScrollbarPropsContext] = createContext<
  ComputedRef<ScrollbarProps>
>('ScrollAreaScrollbarPropsContext')
