import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevPageTriggerProps = HTMLArkProps<'button'>

export const PaginationPrevPageTrigger = forwardRef<'button'>((props, ref) => {
  const { prevPageTriggerProps } = usePaginationContext()
  const mergedProps = mergeProps(prevPageTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
