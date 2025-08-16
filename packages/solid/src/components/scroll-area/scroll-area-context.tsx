import type { JSX } from 'solid-js'
import { type UseScrollAreaContext, useScrollAreaContext } from './use-scroll-area-context'

export interface ScrollAreaContextProps {
  children: (context: UseScrollAreaContext) => JSX.Element
}

export function ScrollAreaContext(props: ScrollAreaContextProps) {
  return props.children(useScrollAreaContext())
}
