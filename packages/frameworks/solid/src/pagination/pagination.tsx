import { mergeProps } from '@zag-js/solid'
import { splitProps, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { PaginationProvider } from './pagination-context'
import { usePagination, type UsePaginationProps, type UsePaginationReturn } from './use-pagination'

export interface PaginationProps
  extends Assign<
    Assign<
      HTMLArkProps<'nav'>,
      { children?: JSX.Element | ((pages: UsePaginationReturn) => JSX.Element) }
    >,
    UsePaginationProps
  > {}

export const Pagination = (props: PaginationProps) => {
  const [paginationParams, restProps] = createSplitProps<UsePaginationProps>()(props, [
    'count',
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
  ])

  const [childrenProps, localProps] = splitProps(restProps, ['children'])

  const api = usePagination(paginationParams)

  const getChildren = () => runIfFn(childrenProps.children, api)

  const rootProps = mergeProps(() => api().rootProps, localProps)

  return (
    <PaginationProvider value={api}>
      <ark.nav {...rootProps}>{getChildren()}</ark.nav>
    </PaginationProvider>
  )
}
