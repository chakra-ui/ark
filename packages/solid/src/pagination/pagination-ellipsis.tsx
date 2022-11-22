import type { Assign } from '@polymorphic-factory/solid'
import { mergeProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationEllipsisProps = Assign<HTMLArkProps<'span'>, { index: number }>

export const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const { index, ...spanProps } = props
  const { getEllipsisProps } = usePaginationContext()
  const mergedProps = mergeProps(getEllipsisProps({ index }), spanProps)
  return <ark.span {...mergedProps} />
}
