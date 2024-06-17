import type { EllipsisProps } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationEllipsisBaseProps extends EllipsisProps, PolymorphicProps<'div'> {}
export interface PaginationEllipsisProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    PaginationEllipsisBaseProps {}

export const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const [ellipsisProps, localProps] = createSplitProps<EllipsisProps>()(props, ['index'])

  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getEllipsisProps(ellipsisProps), localProps)

  return <ark.div {...mergedProps} />
}
