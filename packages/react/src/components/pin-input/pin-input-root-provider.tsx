import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UsePinInputReturn } from './use-pin-input'
import { PinInputProvider } from './use-pin-input-context'

interface RootProviderProps {
  value: UsePinInputReturn
}

export interface PinInputRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const PinInputRootProvider = forwardRef<HTMLDivElement, PinInputRootProviderProps>(
  (props, ref) => {
    const [{ value: pinInput }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(pinInput.rootProps, localProps)

    return (
      <PinInputProvider value={pinInput}>
        <ark.div {...mergedProps} ref={ref} />
      </PinInputProvider>
    )
  },
)

PinInputRootProvider.displayName = 'PinInputRootProvider'
