import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { parts } from './pagination.anatomy'

export type PaginationListProps = HTMLArkProps<'ul'>

export const PaginationList = forwardRef<HTMLUListElement, PaginationListProps>((props, ref) => (
  <ark.ul {...parts.list.attrs} {...props} ref={ref} />
))

PaginationList.displayName = 'PaginationList'
