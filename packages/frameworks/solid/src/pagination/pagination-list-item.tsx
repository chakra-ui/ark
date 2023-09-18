import { ark, type HTMLArkProps } from '../factory'
import { parts } from './pagination.anatomy'

export type PaginationListItemProps = HTMLArkProps<'li'>

export const PaginationListItem = (props: PaginationListItemProps) => (
  <ark.li {...parts.listItem.attrs} {...props} />
)
