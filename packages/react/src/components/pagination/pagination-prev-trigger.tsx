import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationPrevTriggerBaseProps extends PolymorphicProps {}
export interface PaginationPrevTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PaginationPrevTriggerBaseProps {}

export const PaginationPrevTrigger = forwardRef<HTMLButtonElement, PaginationPrevTriggerProps>(
  (props, ref) => {
    const pagination = usePaginationContext()
    const mergedProps = mergeProps(pagination.getPrevTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

PaginationPrevTrigger.displayName = 'PaginationPrevTrigger'
