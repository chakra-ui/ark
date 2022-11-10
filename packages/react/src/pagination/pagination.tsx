import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { splitProps } from '../split-props'
import type { Assign } from '../types'
import { PaginationProvider } from './pagination-context'
import { usePagination, UsePaginationProps, UsePaginationReturn } from './use-pagination'

export type PaginationProps = Assign<
  Assign<HTMLArkProps<'nav'>, UsePaginationProps>,
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
      <ark.nav {...mergedProps} ref={ref}>
        {view}
      </ark.nav>
    </PaginationProvider>
  )
})
