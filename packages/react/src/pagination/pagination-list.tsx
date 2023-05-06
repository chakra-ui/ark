import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { parts } from './pagination.anatomy'

export type PaginationListProps = HTMLArkProps<'ul'>

export const PaginationList = forwardRef<'ul'>((props, ref) => (
  <ark.ul {...parts.list.attrs} {...props} ref={ref} />
))
