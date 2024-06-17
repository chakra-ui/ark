import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UsePinInputReturn } from './use-pin-input'
import { PinInputProvider } from './use-pin-input-context'

interface RootProviderProps {
  value: UsePinInputReturn
}

export interface PinInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface PinInputRootProviderProps
  extends HTMLAttributes<HTMLDivElement>,
    PinInputRootProviderBaseProps {}

export const PinInputRootProvider = forwardRef<HTMLDivElement, PinInputRootProviderProps>(
  (props, ref) => {
    const [{ value: pinInput }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(pinInput.getRootProps(), localProps)

    return (
      <PinInputProvider value={pinInput}>
        <ark.div {...mergedProps} ref={ref} />
      </PinInputProvider>
    )
  },
)

PinInputRootProvider.displayName = 'PinInputRootProvider'
