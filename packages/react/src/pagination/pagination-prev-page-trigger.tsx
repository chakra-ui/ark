import { Children, cloneElement, type ReactElement } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { usePaginationContext } from './pagination-context'

export type PaginationPrevPageTriggerProps = HTMLArkProps<'li'> & { children: ReactElement }

export const PaginationPrevPageTrigger = forwardRef<'li', PaginationPrevPageTriggerProps>(
  (props, ref) => {
    const { prevPageTriggerProps } = usePaginationContext()
    const child = cloneElement(Children.only(props.children), prevPageTriggerProps)

    return (
      <ark.li {...props} ref={ref}>
        {child}
      </ark.li>
    )
  },
)
