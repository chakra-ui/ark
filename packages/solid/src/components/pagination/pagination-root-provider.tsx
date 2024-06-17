import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UsePaginationReturn } from './use-pagination'
import { PaginationProvider } from './use-pagination-context'

interface RootProviderProps {
  value: UsePaginationReturn
}

export interface PaginationRootProviderBaseProps extends PolymorphicProps<'nav'> {}
export interface PaginationRootProviderProps
  extends JSX.HTMLAttributes<HTMLElement>,
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
