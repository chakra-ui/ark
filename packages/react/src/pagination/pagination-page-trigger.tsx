import { forwardRef } from '@polymorphic-factory/react'
import { Children, cloneElement, ReactElement } from 'react'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePaginationContext } from './pagination-context'

export type PaginationPageTriggerProps = Assign<
  HTMLArkProps<'li'>,
  { children: ReactElement; value: number }
>

export const PaginationPageTrigger = forwardRef<'li', PaginationPageTriggerProps>((props, ref) => {
  const { value, children, ...liProps } = props
  const { getPageTriggerProps } = usePaginationContext()
  const itemProps = getPageTriggerProps({ type: 'page', value })
  const child = cloneElement(Children.only(children), itemProps)

  return (
    <ark.li {...liProps} ref={ref}>
      {child}
    </ark.li>
  )
})
