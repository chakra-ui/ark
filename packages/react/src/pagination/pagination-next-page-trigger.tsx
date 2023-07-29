import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationNextPageTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const PaginationNextPageTrigger = forwardRef<
  HTMLButtonElement,
  PaginationNextPageTriggerProps
>((props, ref) => {
  const { nextPageTriggerProps } = usePaginationContext()
  const mergedProps = mergeProps(nextPageTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

PaginationNextPageTrigger.displayName = 'PaginationNextPageTrigger'
