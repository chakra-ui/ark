'use client'

import { mergeProps } from '@zag-js/react'
import { type Ref, forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { PaginationAnchorProps } from './use-pagination.ts'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationNextTriggerBaseProps extends PolymorphicProps {}
export interface PaginationNextTriggerProps
  extends HTMLProps<'button'>, PaginationAnchorProps, PaginationNextTriggerBaseProps {}

export const PaginationNextTrigger = forwardRef<HTMLButtonElement | HTMLAnchorElement, PaginationNextTriggerProps>(
  (props, ref) => {
    const pagination = usePaginationContext()
    const mergedProps = mergeProps(pagination.getNextTriggerProps(), props)

    if (pagination.type === 'link') return <ark.a {...mergedProps} ref={ref as Ref<HTMLAnchorElement>} />

    return <ark.button {...mergedProps} ref={ref as Ref<HTMLButtonElement>} />
  },
)

PaginationNextTrigger.displayName = 'PaginationNextTrigger'
