import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UsePaginationProps, usePagination } from './use-pagination'
import { PaginationProvider } from './use-pagination-context'

export interface PaginationRootBaseProps extends UsePaginationProps, PolymorphicProps<'nav'> {}
export interface PaginationRootProps extends HTMLProps<'nav'>, PaginationRootBaseProps {}

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
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <PaginationProvider value={api}>
      <ark.nav {...mergedProps} />
    </PaginationProvider>
  )
}
