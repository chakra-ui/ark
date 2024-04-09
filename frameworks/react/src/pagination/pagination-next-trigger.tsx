import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationNextTriggerProps extends HTMLArkProps<'button'> {}

export const PaginationNextTrigger = forwardRef<HTMLButtonElement, PaginationNextTriggerProps>(
  (props, ref) => {
    const pagination = usePaginationContext()
    const mergedProps = mergeProps(pagination.nextTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

PaginationNextTrigger.displayName = 'PaginationNextTrigger'
