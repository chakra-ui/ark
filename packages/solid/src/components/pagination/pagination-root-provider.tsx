import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UsePaginationReturn } from './use-pagination'
import { PaginationProvider } from './use-pagination-context'

interface RootProviderProps {
  value: UsePaginationReturn
}

export interface PaginationRootProviderBaseProps extends PolymorphicProps<'nav'> {}
export interface PaginationRootProviderProps
  extends HTMLProps<'nav'>,
    RootProviderProps,
    PaginationRootProviderBaseProps {}

export const PaginationRootProvider = (props: PaginationRootProviderProps) => {
  const [{ value: pagination }, localProps] = createSplitProps<RootProviderProps>()(props, [
    'value',
  ])
  const mergedProps = mergeProps(() => pagination().getRootProps(), localProps)

  return (
    <PaginationProvider value={pagination}>
      <ark.nav {...mergedProps} />
    </PaginationProvider>
  )
}
