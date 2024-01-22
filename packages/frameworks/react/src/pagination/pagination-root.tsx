import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { PaginationProvider } from './pagination-context'
import { usePagination, type UsePaginationProps, type UsePaginationReturn } from './use-pagination'

export interface PaginationRootProps
  extends Assign<
    Assign<
      HTMLArkProps<'nav'>,
      { children?: ReactNode | ((api: UsePaginationReturn) => ReactNode) }
    >,
    UsePaginationProps
  > {}

export const PaginationRoot = forwardRef<HTMLElement, PaginationRootProps>((props, ref) => {
  const [paginationProps, { children, ...localProps }] = createSplitProps<UsePaginationProps>()(
    props,
    [
      'count',
      'defaultPage',
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
    ],
  )

  const api = usePagination(paginationProps)
  const mergedProps = mergeProps(api.rootProps, localProps)

  const view = runIfFn(children, api)

  return (
    <PaginationProvider value={api}>
      <ark.nav {...mergedProps} ref={ref}>
        {view}
      </ark.nav>
    </PaginationProvider>
  )
})

PaginationRoot.displayName = 'PaginationRoot'
