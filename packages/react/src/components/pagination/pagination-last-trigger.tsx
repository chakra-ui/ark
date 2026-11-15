'use client'

import { mergeProps } from '@zag-js/react'
import { type Ref, forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { PaginationAnchorProps } from './use-pagination.ts'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationLastTriggerBaseProps extends PolymorphicProps {}
export interface PaginationLastTriggerProps
  extends HTMLProps<'button'>, PaginationAnchorProps, PaginationLastTriggerBaseProps {}

export const PaginationLastTrigger = forwardRef<HTMLButtonElement | HTMLAnchorElement, PaginationLastTriggerProps>(
  (props, ref) => {
    const pagination = usePaginationContext()
    const mergedProps = mergeProps(pagination.getLastTriggerProps(), props)

    if (pagination.type === 'link') return <ark.a {...mergedProps} ref={ref as Ref<HTMLAnchorElement>} />

    return <ark.button {...mergedProps} ref={ref as Ref<HTMLButtonElement>} />
  },
)

PaginationLastTrigger.displayName = 'PaginationLastTrigger'
