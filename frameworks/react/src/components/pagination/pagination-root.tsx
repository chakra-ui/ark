import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UsePaginationProps, usePagination } from './use-pagination'
import { PaginationProvider } from './use-pagination-context'

export interface PaginationRootProps extends Assign<HTMLArkProps<'nav'>, UsePaginationProps> {}

export const PaginationRoot = forwardRef<HTMLElement, PaginationRootProps>((props, ref) => {
  const [paginationProps, localProps] = createSplitProps<UsePaginationProps>()(props, [
    'count',
    'defaultPage',

    'id',
    'ids',
    'onPageChange',
    'page',
    'pageSize',
    'siblingCount',
    'translations',
    'type',
  ])

  const pagination = usePagination(paginationProps)
  const mergedProps = mergeProps(pagination.rootProps, localProps)

  return (
    <PaginationProvider value={pagination}>
      <ark.nav {...mergedProps} ref={ref} />
    </PaginationProvider>
  )
})

PaginationRoot.displayName = 'PaginationRoot'
