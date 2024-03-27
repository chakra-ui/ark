import type { JSX } from 'solid-js'
import { usePaginationContext, type UsePaginationContext } from './use-pagination-context'

export interface PaginationContextProps {
  children: (context: UsePaginationContext) => JSX.Element
}

export const PaginationContext = (props: PaginationContextProps) =>
  props.children(usePaginationContext())
