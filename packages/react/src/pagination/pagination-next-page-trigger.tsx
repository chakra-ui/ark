import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { usePaginationContext } from './pagination-context'

export type PaginationNextPageTriggerProps = HTMLArkProps<'button'>

export const PaginationNextPageTrigger = forwardRef<'button'>((props, ref) => {
  const { nextPageTriggerProps } = usePaginationContext()
  const mergedProps = mergeProps(nextPageTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
