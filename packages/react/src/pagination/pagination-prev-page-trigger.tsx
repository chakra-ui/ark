import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevPageTriggerProps = HTMLArkProps<'button'>

export const PaginationPrevPageTrigger = forwardRef<
  HTMLButtonElement,
  PaginationPrevPageTriggerProps
>((props, ref) => {
  const { prevPageTriggerProps } = usePaginationContext()
  const mergedProps = mergeProps(prevPageTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

PaginationPrevPageTrigger.displayName = 'PaginationPrevPageTrigger'
