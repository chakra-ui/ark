import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { parts } from './pagination.anatomy'

export type PaginationListItemProps = HTMLArkProps<'li'>

export const PaginationListItem = forwardRef<'li'>((props, ref) => (
  <ark.li {...parts.listItem.attrs} {...props} ref={ref} />
))
