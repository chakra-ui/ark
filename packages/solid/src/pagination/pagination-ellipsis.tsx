import type { EllipsisProps } from '@zag-js/pagination/dist/pagination.types'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePaginationContext } from './pagination-context'

export type PaginationEllipsisProps = Assign<HTMLArkProps<'div'>, EllipsisProps>

export const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const [ellipsisParams, restProps] = createSplitProps<EllipsisProps>()(props, ['index'])
  const api = usePaginationContext()
  const ellipsisProps = mergeProps(() => api().getEllipsisProps(ellipsisParams), restProps)

  return <ark.div {...ellipsisProps} />
}
