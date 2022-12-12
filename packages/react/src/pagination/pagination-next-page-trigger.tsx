import { forwardRef } from '@polymorphic-factory/react'
import { Children, cloneElement, ReactElement } from 'react'
import { ark, HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationNextPageTriggerProps = HTMLArkProps<'li'> & { children: ReactElement }

export const PaginationNextPageTrigger = forwardRef<'li', PaginationNextPageTriggerProps>(
  (props, ref) => {
    const { nextPageTriggerProps } = usePaginationContext()
    const child = cloneElement(Children.only(props.children), nextPageTriggerProps)

    return (
      <ark.li {...props} ref={ref}>
        {child}
      </ark.li>
    )
  },
)
