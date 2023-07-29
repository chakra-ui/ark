import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevPageTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const PaginationPrevPageTrigger = forwardRef<
  HTMLButtonElement,
  PaginationPrevPageTriggerProps
>((props, ref) => {
  const { prevPageTriggerProps } = usePaginationContext()
  const mergedProps = mergeProps(prevPageTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

PaginationPrevPageTrigger.displayName = 'PaginationPrevPageTrigger'
