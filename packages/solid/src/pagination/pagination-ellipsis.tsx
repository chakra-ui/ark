import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

type PaginationEllipsisParams = { index: number }
export type PaginationEllipsisProps = Assign<HTMLArkProps<'span'>, PaginationEllipsisParams>

export const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const [ellipsisProps, spanProps] = createSplitProps<PaginationEllipsisParams>()(props, ['index'])
  const pagination = usePaginationContext()

  return <ark.span {...pagination().getEllipsisProps(ellipsisProps)} {...spanProps} />
}
