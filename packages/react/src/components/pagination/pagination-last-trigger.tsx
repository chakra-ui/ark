'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationLastTriggerBaseProps extends PolymorphicProps {}
export interface PaginationLastTriggerProps extends HTMLProps<'button'>, PaginationLastTriggerBaseProps {}

export const PaginationLastTrigger = ({ ref, ...props }: PaginationLastTriggerProps) => {
  const pagination = usePaginationContext()
  const mergedProps = mergeProps(pagination.getLastTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

PaginationLastTrigger.displayName = 'PaginationLastTrigger'
