import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationPrevTriggerProps extends HTMLArkProps<'button'> {}

export const PaginationPrevTrigger = forwardRef<HTMLButtonElement, PaginationPrevTriggerProps>(
  (props, ref) => {
    const pagination = usePaginationContext()
    const mergedProps = mergeProps(pagination.prevTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

PaginationPrevTrigger.displayName = 'PaginationPrevTrigger'
