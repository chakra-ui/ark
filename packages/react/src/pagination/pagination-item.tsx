import { forwardRef } from '@polymorphic-factory/react'
import { Children, cloneElement, ReactElement } from 'react'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePaginationContext } from './pagination-context'

export type PaginationItemProps = Assign<
  HTMLArkProps<'li'>,
  { children: ReactElement; value: number }
>

export const PaginationItem = forwardRef<'li', PaginationItemProps>((props, ref) => {
  const { value, children, ...liProps } = props
  const { getItemProps } = usePaginationContext()
  const itemProps = getItemProps({ type: 'page', value })
  const child = cloneElement(Children.only(children), itemProps)

  return (
    <ark.li {...liProps} ref={ref}>
      {child}
    </ark.li>
  )
})
