import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { Assign, splitProps } from '../split-props'
import { usePaginationContext } from './pagination-context'

export type PaginationItemProps = Assign<HTMLArkProps<'a'>, { value: number }>

export const PaginationItem = forwardRef<'a', PaginationItemProps>((props, ref) => {
  const { getItemProps } = usePaginationContext()
  const [{ value }, anchorProps] = splitProps(props, ['value'])
  const mergedProps = mergeProps(getItemProps({ type: 'page', value }), anchorProps)
  return <ark.a href={`#${value}`} {...mergedProps} ref={ref} />
})
