import type { JSX } from 'solid-js'
import { type UsePaginationContext, usePaginationContext } from './use-pagination-context'

export interface PaginationContextProps {
  children: (context: UsePaginationContext) => JSX.Element
}

export const PaginationContext = (props: PaginationContextProps) =>
  props.children(usePaginationContext())
