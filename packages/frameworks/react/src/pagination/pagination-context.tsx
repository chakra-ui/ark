import { usePaginationContext, type UsePaginationContext } from './use-pagination-context'

export interface PaginationContextProps {
  children: (context: UsePaginationContext) => React.ReactNode
}

export const PaginationContext = (props: PaginationContextProps) =>
  props.children(usePaginationContext())
