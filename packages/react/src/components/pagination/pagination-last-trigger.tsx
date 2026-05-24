'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationLastTriggerBaseProps extends PolymorphicProps {}
export interface PaginationLastTriggerProps extends HTMLProps<'button'>, PaginationLastTriggerBaseProps {}

export const PaginationLastTrigger = forwardRef<HTMLButtonElement, PaginationLastTriggerProps>((props, ref) => {
  const pagination = usePaginationContext()
  const mergedProps = mergeProps(pagination.getLastTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

PaginationLastTrigger.displayName = 'PaginationLastTrigger'
