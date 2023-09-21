import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export interface PaginationPrevPageTriggerProps extends HTMLArkProps<'button'> {}

export const PaginationPrevPageTrigger = forwardRef<
  HTMLButtonElement,
  PaginationPrevPageTriggerProps
>((props, ref) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(api.prevPageTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

PaginationPrevPageTrigger.displayName = 'PaginationPrevPageTrigger'
