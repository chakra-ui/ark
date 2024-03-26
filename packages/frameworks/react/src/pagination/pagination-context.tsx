import type { ReactNode } from 'react'
import { usePaginationContext, type UsePaginationContext } from './use-pagination-context'

export interface PaginationContextProps {
  children: (context: UsePaginationContext) => ReactNode
}

export const PaginationContext = (props: PaginationContextProps) =>
  props.children(usePaginationContext())
