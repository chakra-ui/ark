import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UsePaginationReturn } from './use-pagination'
import { PaginationProvider } from './use-pagination-context'

interface RootProviderProps {
  value: UsePaginationReturn
}

export interface PaginationRootProviderProps extends HTMLArkProps<'nav'>, RootProviderProps {}

export const PaginationRootProvider = (props: PaginationRootProviderProps) => {
  const [{ value: pagination }, localProps] = createSplitProps<RootProviderProps>()(props, [
    'value',
  ])
  const mergedProps = mergeProps(() => pagination().rootProps, localProps)

  return (
    <PaginationProvider value={pagination}>
      <ark.nav {...mergedProps} />
    </PaginationProvider>
  )
}
