import { forwardRef } from '@polymorphic-factory/react'
import type { ReactNode } from 'react'
import { atlas, HTMLAtlasProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { Assign, splitProps } from '../split-props'
import { PaginationProvider } from './pagination-context'
import { usePagination, UsePaginationProps, UsePaginationReturn } from './use-pagination'

export type PaginationProps = Assign<
  Assign<HTMLAtlasProps<'nav'>, UsePaginationProps>,
  {
    children: ReactNode | ((pages: UsePaginationReturn) => ReactNode)
  }
>

export const Pagination = forwardRef<'nav', PaginationProps>((props, ref) => {
  const [paginationProps, { children, ...htmlProps }] = splitProps(props, [
    'count',
    'dir',
    'getRootNode',
    'ids',
    'onChange',
    'page',
    'pageSize',
    'siblingCount',
    'translations',
  ])
  const pagination = usePagination(paginationProps)

  const view = runIfFn(children, pagination)

  return (
    <PaginationProvider value={pagination}>
      <atlas.nav {...pagination.rootProps} {...htmlProps} ref={ref}>
        {view}
      </atlas.nav>
    </PaginationProvider>
  )
})
