import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationNextItemProps = HTMLArkProps<'a'>

export const PaginationNextItem = forwardRef<'a', PaginationNextItemProps>((props, ref) => {
  const { nextItemProps } = usePaginationContext()
  const mergedProps = mergeProps(nextItemProps, props)
  return <ark.a href="#next" {...mergedProps} ref={ref} />
})
