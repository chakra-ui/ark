import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { parts } from './pagination.anatomy'

export type PaginationListItemProps = HTMLArkProps<'li'>

export const PaginationListItem = forwardRef<HTMLLIElement, PaginationListItemProps>(
  (props, ref) => <ark.li {...parts.listItem.attrs} {...props} ref={ref} />,
)

PaginationListItem.displayName = 'PaginationListItem'
