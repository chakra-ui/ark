import { type Assign } from '@polymorphic-factory/solid'
import { mergeProps } from '@zag-js/solid'
import { splitProps, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { PaginationProvider } from './pagination-context'
import { usePagination, type UsePaginationProps, type UsePaginationReturn } from './use-pagination'

export type PaginationProps = Assign<
  HTMLArkProps<'nav'>,
  UsePaginationProps & {
    children: JSX.Element | ((pages: UsePaginationReturn) => JSX.Element)
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

  const [childrenProps, localProps] = splitProps(restProps, ['children'])

  const api = usePagination(paginationProps)

  const getChildren = () => runIfFn(childrenProps.children, api)

  const rootProps = mergeProps(() => api().rootProps, localProps)

  return (
    <PaginationProvider value={api}>
      <ark.nav {...rootProps}>{getChildren()}</ark.nav>
    </PaginationProvider>
  )
}
