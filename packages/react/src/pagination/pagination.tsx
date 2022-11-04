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
    children: ReactNode | ((pages: UsePaginationReturn['pages']) => ReactNode)
  }
>

export const Pagination = forwardRef<'nav', PaginationProps>((props: PaginationProps) => {
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

  const view = runIfFn(children, pagination.pages)

  return (
    <PaginationProvider value={pagination}>
      <atlas.nav {...pagination.rootProps} {...htmlProps}>
        {view}
      </atlas.nav>
    </PaginationProvider>
  )
})
