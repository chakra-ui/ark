import type { EllipsisProps } from '@zag-js/pagination/dist/pagination.types'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { type Assign } from '../types'
import { usePaginationContext } from './pagination-context'

export type PaginationEllipsisProps = Assign<HTMLArkProps<'div'>, EllipsisProps>

export const PaginationEllipsis = forwardRef<'div', EllipsisProps>((props, ref) => {
  const [ellipsisProps, localProps] = createSplitProps<EllipsisProps>()(props, ['index'])
  const { getEllipsisProps } = usePaginationContext()
  const mergedProps = mergeProps(getEllipsisProps(ellipsisProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})
