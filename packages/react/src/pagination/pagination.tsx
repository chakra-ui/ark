import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
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
  const [paginationProps, { children, ...navProps }] = splitProps(props, [
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

  const mergedProps = mergeProps(pagination.rootProps, navProps)

  return (
    <PaginationProvider value={pagination}>
      <atlas.nav {...mergedProps} ref={ref}>
        {view}
      </atlas.nav>
    </PaginationProvider>
  )
})
