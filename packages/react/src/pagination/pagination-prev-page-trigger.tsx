import { forwardRef } from '@polymorphic-factory/react'
import { Children, cloneElement, ReactElement } from 'react'
import { ark, HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevPageTriggerProps = HTMLArkProps<'li'> & { children: ReactElement }

export const PaginationPrevPageTrigger = forwardRef<'li', PaginationPrevPageTriggerProps>(
  (props, ref) => {
    const { prevItemProps } = usePaginationContext()
    const child = cloneElement(Children.only(props.children), prevItemProps)

    return (
      <ark.li {...props} ref={ref}>
        {child}
      </ark.li>
    )
  },
)
