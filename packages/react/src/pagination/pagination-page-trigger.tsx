import type { PageTriggerProps } from '@zag-js/pagination/dist/pagination.types'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { usePaginationContext } from './pagination-context'

export type PaginationPageTriggerProps = Assign<HTMLArkProps<'button'>, PageTriggerProps>

export const PaginationPageTrigger = forwardRef<'button', PaginationPageTriggerProps>(
  (props, ref) => {
    const [paginationProps, localProps] = createSplitProps<PageTriggerProps>()(props, [
      'type',
      'value',
    ])

    const { getPageTriggerProps } = usePaginationContext()
    const mergedProps = mergeProps(getPageTriggerProps(paginationProps), localProps)

    return <ark.button {...mergedProps} ref={ref} />
  },
)
