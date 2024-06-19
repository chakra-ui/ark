import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseToggleGroupReturn } from './use-toggle-group'
import { ToggleGroupProvider } from './use-toggle-group-context'

interface RootProviderProps {
  value: UseToggleGroupReturn
}

export interface ToggleGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface ToggleGroupRootProviderProps
  extends HTMLProps<'div'>,
    ToggleGroupRootProviderBaseProps {}

export const ToggleGroupRootProvider = forwardRef<HTMLDivElement, ToggleGroupRootProviderProps>(
  (props, ref) => {
    const [{ value: toggleGroup }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(toggleGroup.getRootProps(), localProps)

    return (
      <ToggleGroupProvider value={toggleGroup}>
        <ark.div {...mergedProps} ref={ref} />
      </ToggleGroupProvider>
    )
  },
)

ToggleGroupRootProvider.displayName = 'ToggleGroupRootProvider'
