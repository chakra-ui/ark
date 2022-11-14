import { forwardRef } from '@polymorphic-factory/react'
import { Children, cloneElement, ReactElement } from 'react'
import { ark, HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevItemProps = HTMLArkProps<'li'> & { children: ReactElement }

export const PaginationPrevItem = forwardRef<'li', PaginationPrevItemProps>((props, ref) => {
  const { prevItemProps } = usePaginationContext()
  const child = cloneElement(Children.only(props.children), prevItemProps)

  return (
    <ark.li {...props} ref={ref}>
      {child}
    </ark.li>
  )
})
