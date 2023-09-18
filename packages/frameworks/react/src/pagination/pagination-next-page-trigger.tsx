import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationNextPageTriggerProps = HTMLArkProps<'button'>

export const PaginationNextPageTrigger = forwardRef<
  HTMLButtonElement,
  PaginationNextPageTriggerProps
>((props, ref) => {
  const { nextPageTriggerProps } = usePaginationContext()
  const mergedProps = mergeProps(nextPageTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

PaginationNextPageTrigger.displayName = 'PaginationNextPageTrigger'
