import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevItemProps = HTMLArkProps<'a'>

export const PaginationPrevItem = forwardRef<'a', PaginationPrevItemProps>((props, ref) => {
  const { prevItemProps } = usePaginationContext()
  const mergedProps = mergeProps(prevItemProps, props)
  return <ark.a href="#previous" {...mergedProps} ref={ref} />
})
