import type { EllipsisProps } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationEllipsisProps extends Assign<HTMLArkProps<'div'>, EllipsisProps> {}

export const PaginationEllipsis = forwardRef<HTMLDivElement, PaginationEllipsisProps>(
  (props, ref) => {
    const [ellipsisProps, localProps] = createSplitProps<EllipsisProps>()(props, ['index'])
    const pagination = usePaginationContext()
    const mergedProps = mergeProps(pagination.getEllipsisProps(ellipsisProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

PaginationEllipsis.displayName = 'PaginationEllipsis'
