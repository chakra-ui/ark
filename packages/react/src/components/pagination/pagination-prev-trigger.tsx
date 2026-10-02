'use client'

import { mergeProps } from '@zag-js/react'
import { type Ref, forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { PaginationAnchorProps } from './use-pagination.ts'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationPrevTriggerBaseProps extends PolymorphicProps {}
export interface PaginationPrevTriggerProps
  extends HTMLProps<'button'>, PaginationAnchorProps, PaginationPrevTriggerBaseProps {}

export const PaginationPrevTrigger = forwardRef<HTMLButtonElement | HTMLAnchorElement, PaginationPrevTriggerProps>(
  (props, ref) => {
    const pagination = usePaginationContext()
    const mergedProps = mergeProps(pagination.getPrevTriggerProps(), props)

    if (pagination.type === 'link') return <ark.a {...mergedProps} ref={ref as Ref<HTMLAnchorElement>} />

    return <ark.button {...mergedProps} ref={ref as Ref<HTMLButtonElement>} />
  },
)

PaginationPrevTrigger.displayName = 'PaginationPrevTrigger'
