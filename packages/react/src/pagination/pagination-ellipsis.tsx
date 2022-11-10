import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { splitProps } from '../split-props'
import type { Assign } from '../types'
import { usePaginationContext } from './pagination-context'

export type PaginationEllipsisProps = Assign<HTMLArkProps<'span'>, { index: number }>

export const PaginationEllipsis = forwardRef<'span', PaginationEllipsisProps>((props, ref) => {
  const { getEllipsisProps } = usePaginationContext()
  const [{ index }, spanProps] = splitProps(props, ['index'])
  const mergedProps = mergeProps(getEllipsisProps({ index }), spanProps)
  return <ark.span {...mergedProps} ref={ref} />
})
