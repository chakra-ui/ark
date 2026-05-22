'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationPrevTriggerBaseProps extends PolymorphicProps {}
export interface PaginationPrevTriggerProps extends HTMLProps<'button'>, PaginationPrevTriggerBaseProps {}

export const PaginationPrevTrigger = ({ ref, ...props }: PaginationPrevTriggerProps) => {
  const pagination = usePaginationContext()
  const mergedProps = mergeProps(pagination.getPrevTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

PaginationPrevTrigger.displayName = 'PaginationPrevTrigger'
