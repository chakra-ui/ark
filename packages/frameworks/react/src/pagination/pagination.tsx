import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { PaginationProvider } from './pagination-context'
import { usePagination, type UsePaginationProps, type UsePaginationReturn } from './use-pagination'

export interface PaginationProps
  extends Assign<
    Assign<
      HTMLArkProps<'nav'>,
      { children?: ReactNode | ((api: UsePaginationReturn) => ReactNode) }
    >,
    UsePaginationProps
  > {}

export const Pagination = forwardRef<HTMLElement, PaginationProps>((props, ref) => {
  const [paginationProps, { children, ...navProps }] = createSplitProps<UsePaginationProps>()(
    props,
    [
      'count',
      'defaultPage',
      'dir',
      'getRootNode',
      'id',
      'ids',
      'onPageChange',
      'page',
      'pageSize',
      'siblingCount',
      'translations',
      'type',
    ],
  )

  const api = usePagination(paginationProps)
  const view = runIfFn(children, api)
  const mergedProps = mergeProps(api.rootProps, navProps)

  return (
    <PaginationProvider value={api}>
      <ark.nav {...mergedProps} ref={ref}>
        {view}
      </ark.nav>
    </PaginationProvider>
  )
})

Pagination.displayName = 'Pagination'
