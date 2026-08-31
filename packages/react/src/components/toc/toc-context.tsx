import type { ReactNode } from 'react'
import { type UseTocContext, useTocContext } from './use-toc-context'

export interface TocContextProps {
  children: (context: UseTocContext) => ReactNode
}

export const TocContext = (props: TocContextProps) => props.children(useTocContext())
