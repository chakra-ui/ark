import type { EllipsisProps } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { usePaginationContext } from './pagination-context'

export type PaginationEllipsisProps = Assign<HTMLArkProps<'div'>, EllipsisProps>

export const PaginationEllipsis = forwardRef<HTMLDivElement, PaginationEllipsisProps>(
  (props, ref) => {
    const [ellipsisProps, localProps] = createSplitProps<EllipsisProps>()(props, ['index'])
    const { getEllipsisProps } = usePaginationContext()
    const mergedProps = mergeProps(getEllipsisProps(ellipsisProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

PaginationEllipsis.displayName = 'PaginationEllipsis'
