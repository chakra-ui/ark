import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationNextTriggerBaseProps extends PolymorphicProps {}
export interface PaginationNextTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PaginationNextTriggerBaseProps {}

export const PaginationNextTrigger = forwardRef<HTMLButtonElement, PaginationNextTriggerProps>(
  (props, ref) => {
    const pagination = usePaginationContext()
    const mergedProps = mergeProps(pagination.getNextTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

PaginationNextTrigger.displayName = 'PaginationNextTrigger'
