import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePagination, type UsePaginationProps } from './use-pagination'
import { PaginationProvider } from './use-pagination-context'

export interface PaginationRootProps extends Assign<HTMLArkProps<'nav'>, UsePaginationProps> {}

export const PaginationRoot = (props: PaginationRootProps) => {
  const [usePaginationProps, localProps] = createSplitProps<UsePaginationProps>()(props, [
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
  const api = usePagination(usePaginationProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <PaginationProvider value={api}>
      <ark.nav {...mergedProps} />
    </PaginationProvider>
  )
}
