import { forwardRef } from '@polymorphic-factory/react'
import { ark, HTMLArkProps } from '../factory'
import { parts } from './pagination.anatomy'

export type PaginationListProps = HTMLArkProps<'ul'>

export const PaginationList = forwardRef<'ul', PaginationListProps>((props, ref) => (
  <ark.ul {...parts.list.attrs} {...props} ref={ref} />
))
