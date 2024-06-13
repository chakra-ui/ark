import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export type PaginationPrevTriggerBaseProps = {}
export interface PaginationPrevTriggerProps
  extends HTMLArkProps<'button'>,
    PaginationPrevTriggerBaseProps {}

export const PaginationPrevTrigger = forwardRef<HTMLButtonElement, PaginationPrevTriggerProps>(
  (props, ref) => {
    const pagination = usePaginationContext()
    const mergedProps = mergeProps(pagination.getPrevTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

PaginationPrevTrigger.displayName = 'PaginationPrevTrigger'
