import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { parts } from './pagination.anatomy'

export type PaginationListProps = ComponentPropsWithoutRef<typeof ark.ul>

export const PaginationList = forwardRef<HTMLUListElement, PaginationListProps>((props, ref) => (
  <ark.ul {...parts.list.attrs} {...props} ref={ref} />
))

PaginationList.displayName = 'PaginationList'
