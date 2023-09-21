import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export interface PaginationNextPageTriggerProps extends HTMLArkProps<'button'> {}

export const PaginationNextPageTrigger = forwardRef<
  HTMLButtonElement,
  PaginationNextPageTriggerProps
>((props, ref) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(api.nextPageTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

PaginationNextPageTrigger.displayName = 'PaginationNextPageTrigger'
