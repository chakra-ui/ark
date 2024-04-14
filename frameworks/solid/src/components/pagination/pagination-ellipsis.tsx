import type { EllipsisProps } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationEllipsisProps extends Assign<HTMLArkProps<'div'>, EllipsisProps> {}

export const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const [ellipsisProps, localProps] = createSplitProps<EllipsisProps>()(props, ['index'])

  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getEllipsisProps(ellipsisProps), localProps)

  return <ark.div {...mergedProps} />
}
