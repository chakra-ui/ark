'use client'

import { mergeProps } from '@zag-js/react'
import { type Ref, forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { PaginationAnchorProps } from './use-pagination.ts'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationFirstTriggerBaseProps extends PolymorphicProps {}
export interface PaginationFirstTriggerProps
  extends HTMLProps<'button'>, PaginationAnchorProps, PaginationFirstTriggerBaseProps {}

export const PaginationFirstTrigger = forwardRef<HTMLButtonElement | HTMLAnchorElement, PaginationFirstTriggerProps>(
  (props, ref) => {
    const pagination = usePaginationContext()
    const mergedProps = mergeProps(pagination.getFirstTriggerProps(), props)

    if (pagination.type === 'link') return <ark.a {...mergedProps} ref={ref as Ref<HTMLAnchorElement>} />

    return <ark.button {...mergedProps} ref={ref as Ref<HTMLButtonElement>} />
  },
)

PaginationFirstTrigger.displayName = 'PaginationFirstTrigger'
