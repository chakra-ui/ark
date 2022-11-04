import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { Assign, splitProps } from '../split-props'
import { PaginationProvider } from './pagination-context'
import { usePagination, UsePaginationProps } from './use-pagination'

export type PaginationProps = Assign<HTMLAtlasProps<'nav'>, UsePaginationProps>

export const Pagination = forwardRef<'nav', PaginationProps>((props: PaginationProps) => {
  const [paginationProps, htmlProps] = splitProps(props, [
    'count',
    'dir',
    'getRootNode',
    'ids',
    'onChange',
    'page',
    'pageSize',
    'siblingCount',
    'translations',
  ])
  const pagination = usePagination(paginationProps)

  return (
    <PaginationProvider value={pagination}>
      <atlas.nav {...pagination.rootProps} {...htmlProps} />
    </PaginationProvider>
  )
})
