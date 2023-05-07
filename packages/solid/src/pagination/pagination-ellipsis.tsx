import { type Assign } from '@polymorphic-factory/solid'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

type PaginationEllipsisParams = { index: number }
export type PaginationEllipsisProps = Assign<HTMLArkProps<'span'>, PaginationEllipsisParams>

export const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const [ellipsisParams, restProps] = createSplitProps<PaginationEllipsisParams>()(props, ['index'])
  const api = usePaginationContext()

  const ellipsisProps = mergeProps(() => api().getEllipsisProps(ellipsisParams), restProps)
  return <ark.span {...ellipsisProps} />
}
