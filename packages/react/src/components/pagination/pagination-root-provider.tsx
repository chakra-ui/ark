import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UsePaginationReturn } from './use-pagination'
import { PaginationProvider } from './use-pagination-context'

interface RootProviderProps {
  value: UsePaginationReturn
}

export interface PaginationRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface PaginationRootProviderProps
  extends HTMLAttributes<HTMLElement>,
    PaginationRootProviderBaseProps {}

export const PaginationRootProvider = forwardRef<HTMLElement, PaginationRootProviderProps>(
  (props, ref) => {
    const [{ value: pagination }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(pagination.getRootProps(), localProps)

    return (
      <PaginationProvider value={pagination}>
        <ark.nav {...mergedProps} ref={ref} />
      </PaginationProvider>
    )
  },
)

PaginationRootProvider.displayName = 'PaginationRootProvider'
