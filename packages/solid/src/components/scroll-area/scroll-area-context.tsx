import type { JSX } from '@solidjs/web'
import { type UseScrollAreaContext, useScrollAreaContext } from './use-scroll-area-context.ts'

export interface ScrollAreaContextProps {
  children: (context: UseScrollAreaContext) => JSX.Element
}

export function ScrollAreaContext(props: ScrollAreaContextProps) {
  return props.children(useScrollAreaContext())
}
