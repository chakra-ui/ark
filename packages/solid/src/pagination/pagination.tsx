import type { Assign } from '@polymorphic-factory/solid'
import type { JSX } from 'solid-js'
import { children, mergeProps, splitProps } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { PaginationProvider } from './pagination-context'
import { usePagination, UsePaginationProps, UsePaginationReturn } from './use-pagination'

export type PaginationProps = Assign<
  Assign<HTMLArkProps<'nav'>, UsePaginationProps>,
  {
    children: JSX.Element | ((pages: ReturnType<UsePaginationReturn>) => JSX.Element)
  }
>

export const Pagination = (props: PaginationProps) => {
  const [paginationProps, restProps] = createSplitProps<UsePaginationProps>()(props, [
    'count',
    'dir',
    'getRootNode',
    'id',
    'ids',
    'onChange',
    'page',
    'pageSize',
    'siblingCount',
    'translations',
  ])
  const [local, navProps] = splitProps(restProps, ['children'])

  const pagination = usePagination(paginationProps)
  const view = () => children(() => runIfFn(local.children, pagination()))
  const mergedProps = mergeProps(pagination().rootProps, navProps)

  return (
    <PaginationProvider value={pagination}>
      <ark.nav {...mergedProps}>{view()}</ark.nav>
    </PaginationProvider>
  )
}
