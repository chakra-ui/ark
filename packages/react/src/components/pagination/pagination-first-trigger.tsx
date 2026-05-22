'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationFirstTriggerBaseProps extends PolymorphicProps {}
export interface PaginationFirstTriggerProps extends HTMLProps<'button'>, PaginationFirstTriggerBaseProps {}

export const PaginationFirstTrigger = ({ ref, ...props }: PaginationFirstTriggerProps) => {
  const pagination = usePaginationContext()
  const mergedProps = mergeProps(pagination.getFirstTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

PaginationFirstTrigger.displayName = 'PaginationFirstTrigger'
