import type { JSX } from '@solidjs/web'
import { type UseTocContext, useTocContext } from './use-toc-context'

export interface TocContextProps {
  children: (context: UseTocContext) => JSX.Element
}

export const TocContext = (props: TocContextProps) => props.children(useTocContext())
