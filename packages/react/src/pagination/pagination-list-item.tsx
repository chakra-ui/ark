import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { parts } from './pagination.anatomy'

export type PaginationListItemProps = ComponentPropsWithoutRef<typeof ark.li>

export const PaginationListItem = forwardRef<HTMLLIElement, PaginationListItemProps>(
  (props, ref) => <ark.li {...parts.listItem.attrs} {...props} ref={ref} />,
)

PaginationListItem.displayName = 'PaginationListItem'
