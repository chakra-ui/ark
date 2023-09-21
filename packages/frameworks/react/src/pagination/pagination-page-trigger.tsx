import type { PageTriggerProps } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePaginationContext } from './pagination-context'

export interface PaginationPageTriggerProps
  extends Assign<HTMLArkProps<'button'>, PageTriggerProps> {}

export const PaginationPageTrigger = forwardRef<HTMLButtonElement, PaginationPageTriggerProps>(
  (props, ref) => {
    const [paginationProps, localProps] = createSplitProps<PageTriggerProps>()(props, [
      'type',
      'value',
    ])

    const api = usePaginationContext()
    const mergedProps = mergeProps(api.getPageTriggerProps(paginationProps), localProps)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

PaginationPageTrigger.displayName = 'PaginationPageTrigger'
