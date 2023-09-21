import { paginationAnatomy } from '@ark-ui/anatomy'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'

export interface PaginationListProps extends HTMLArkProps<'ul'> {}

export const PaginationList = forwardRef<HTMLUListElement, PaginationListProps>((props, ref) => (
  <ark.ul {...paginationAnatomy.build().list.attrs} {...props} ref={ref} />
))

PaginationList.displayName = 'PaginationList'
