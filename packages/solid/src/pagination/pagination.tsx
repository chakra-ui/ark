import { type Assign } from '@polymorphic-factory/solid'
import { children, splitProps, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { PaginationProvider } from './pagination-context'
import { usePagination, type UsePaginationProps, type UsePaginationReturn } from './use-pagination'

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
    'type',
  ])
  const [local, navProps] = splitProps(restProps, ['children'])

  const pagination = usePagination(paginationProps)
  const view = () => children(() => runIfFn(local.children, pagination()))

  return (
    <PaginationProvider value={pagination}>
      <ark.nav {...pagination().rootProps} {...navProps}>
        {view()}
      </ark.nav>
    </PaginationProvider>
  )
}
