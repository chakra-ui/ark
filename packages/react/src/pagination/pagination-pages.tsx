import type { ReactNode } from 'react'
import type { HTMLAtlasProps } from '../factory'
import type { Assign } from '../split-props'
import { usePaginationContext } from './pagination-context'
import type { UsePaginationReturn } from './use-pagination'

export type PaginationPagesProps = Assign<
  HTMLAtlasProps<'div'>,
  {
    children:
      | ReactNode
      | ((
          page: UsePaginationReturn['pages'][number],
          index: number,
          pages: UsePaginationReturn['pages'],
        ) => ReactNode)
  }
>

export const PaginationPages = (props: PaginationPagesProps) => {
  const { children } = props
  const { pages } = usePaginationContext()

  if (typeof children !== 'function') {
    return <>{children}</>
  }

  const view = pages.map(children)
  return <>{view}</>
}
