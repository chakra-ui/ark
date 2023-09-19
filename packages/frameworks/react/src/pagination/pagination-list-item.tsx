import { paginationAnatomy } from '@ark-ui/anatomy'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'

export type PaginationListItemProps = HTMLArkProps<'li'>

export const PaginationListItem = forwardRef<HTMLLIElement, PaginationListItemProps>(
  (props, ref) => <ark.li {...paginationAnatomy.build().listItem.attrs} {...props} ref={ref} />,
)

PaginationListItem.displayName = 'PaginationListItem'
