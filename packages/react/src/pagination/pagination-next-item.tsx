import { forwardRef } from '@polymorphic-factory/react'
import { Children, cloneElement, ReactElement } from 'react'
import { ark, HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationNextItemProps = HTMLArkProps<'li'> & { children: ReactElement }

export const PaginationNextItem = forwardRef<'li', PaginationNextItemProps>((props, ref) => {
  const { nextItemProps } = usePaginationContext()
  const child = cloneElement(Children.only(props.children), nextItemProps)

  return (
    <ark.li {...props} ref={ref}>
      {child}
    </ark.li>
  )
})
