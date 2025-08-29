import type { ReactNode } from 'react'
import { type UseScrollAreaContext, useScrollAreaContext } from './use-scroll-area-context'

export interface ScrollAreaContextProps {
  children: (context: UseScrollAreaContext) => ReactNode
}

export const ScrollAreaContext = (props: ScrollAreaContextProps) => props.children(useScrollAreaContext())
