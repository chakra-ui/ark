import { forwardRef } from '@polymorphic-factory/react'
import { ark, HTMLArkProps } from '../factory'

export type PaginationListProps = HTMLArkProps<'ul'>

export const PaginationList = forwardRef<'ul', PaginationListProps>((props, ref) => (
  <ark.ul {...props} ref={ref} />
))
