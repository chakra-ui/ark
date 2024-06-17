import type { EllipsisProps } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationEllipsisBaseProps extends EllipsisProps, PolymorphicProps<'div'> {}
export interface PaginationEllipsisProps extends HTMLProps<'div'>, PaginationEllipsisBaseProps {}

export const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const [ellipsisProps, localProps] = createSplitProps<EllipsisProps>()(props, ['index'])

  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getEllipsisProps(ellipsisProps), localProps)

  return <ark.div {...mergedProps} />
}
