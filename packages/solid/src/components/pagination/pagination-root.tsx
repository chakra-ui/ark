import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UsePaginationProps, usePagination } from './use-pagination'
import { PaginationProvider } from './use-pagination-context'

export interface PaginationRootProps extends Assign<HTMLArkProps<'nav'>, UsePaginationProps> {}

export const PaginationRoot = (props: PaginationRootProps) => {
  const [usePaginationProps, localProps] = createSplitProps<UsePaginationProps>()(props, [
    'count',
    'defaultPage',
    'id',
    'ids',
    'onPageChange',
    'onPageSizeChange',
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
