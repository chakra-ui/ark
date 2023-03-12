import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePaginationContext } from './pagination-context'

export type PaginationEllipsisProps = Assign<HTMLArkProps<'li'>, { index: number }>

export const PaginationEllipsis = forwardRef<'li', PaginationEllipsisProps>((props, ref) => {
  const { index, ...liProps } = props
  const { getEllipsisProps } = usePaginationContext()
  const mergedProps = mergeProps(getEllipsisProps({ index }), liProps)
  return <ark.li {...mergedProps} ref={ref} />
})
