import { mergeProps } from '@zag-js/react'
import { type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { PaginationProvider } from './pagination-context'
import { usePagination, type UsePaginationProps, type UsePaginationReturn } from './use-pagination'

export type PaginationProps = Assign<
  Assign<HTMLArkProps<'nav'>, UsePaginationProps>,
  {
    children: ReactNode | ((pages: UsePaginationReturn) => ReactNode)
  }
>

export const Pagination = forwardRef<'nav', PaginationProps>((props, ref) => {
  const [paginationProps, { children, ...navProps }] = createSplitProps<UsePaginationProps>()(
    props,
    [
      'count',
      'defaultPage',
      'dir',
      'getRootNode',
      'id',
      'ids',
      'onChange',
      'page',
      'pageSize',
      'siblingCount',
      'translations',
      'type',
    ],
  )
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
