import type { EllipsisProps } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePaginationContext } from './pagination-context'

export interface PaginationEllipsisProps extends Assign<HTMLArkProps<'div'>, EllipsisProps> {}

export const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const [ellipsisProps, restProps] = createSplitProps<EllipsisProps>()(props, ['index'])
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getEllipsisProps(ellipsisProps), restProps)

  return <ark.div {...mergedProps} />
}
