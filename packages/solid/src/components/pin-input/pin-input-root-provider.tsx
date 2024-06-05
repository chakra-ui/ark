import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UsePinInputReturn } from './use-pin-input'
import { PinInputProvider } from './use-pin-input-context'

interface RootProviderProps {
  value: UsePinInputReturn
}

export interface PinInputRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const PinInputRootProvider = (props: PinInputRootProviderProps) => {
  const [{ value: pinInput }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => pinInput().rootProps, localProps)

  return (
    <PinInputProvider value={pinInput}>
      <ark.div {...mergedProps} />
    </PinInputProvider>
  )
}
