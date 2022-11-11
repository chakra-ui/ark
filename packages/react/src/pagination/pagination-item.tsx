import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePaginationContext } from './pagination-context'

export type PaginationItemProps = Assign<HTMLArkProps<'a'>, { value: number }>

export const PaginationItem = forwardRef<'a', PaginationItemProps>((props, ref) => {
  const { value, ...anchorProps } = props
  const { getItemProps } = usePaginationContext()
  const mergedProps = mergeProps(getItemProps({ type: 'page', value }), anchorProps)
  return <ark.a href={`#${value}`} {...mergedProps} ref={ref} />
})
