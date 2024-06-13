import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export type PaginationNextTriggerBaseProps = {}
export interface PaginationNextTriggerProps
  extends HTMLArkProps<'button'>,
    PaginationNextTriggerBaseProps {}

export const PaginationNextTrigger = forwardRef<HTMLButtonElement, PaginationNextTriggerProps>(
  (props, ref) => {
    const pagination = usePaginationContext()
    const mergedProps = mergeProps(pagination.getNextTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

PaginationNextTrigger.displayName = 'PaginationNextTrigger'
