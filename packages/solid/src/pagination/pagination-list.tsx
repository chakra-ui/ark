import { ark, type HTMLArkProps } from '../factory'
import { parts } from './pagination.anatomy'

export type PaginationListProps = HTMLArkProps<'ul'>

export const PaginationList = (props: PaginationListProps) => (
  <ark.ul {...parts.list.attrs} {...props} />
)
