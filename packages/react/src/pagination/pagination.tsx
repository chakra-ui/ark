import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { PaginationProvider } from './pagination-context'
import { usePagination, type UsePaginationProps, type UsePaginationReturn } from './use-pagination'

export type PaginationProps = Assign<
  Assign<ComponentPropsWithoutRef<typeof ark.nav>, UsePaginationProps>,
  {
    children?: ReactNode | ((pages: UsePaginationReturn) => ReactNode)
  }
>

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

Pagination.displayName = 'Pagination'
