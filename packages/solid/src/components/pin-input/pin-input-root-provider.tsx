import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UsePinInputReturn } from './use-pin-input.ts'
import { PinInputProvider } from './use-pin-input-context.ts'

interface RootProviderProps {
  value: UsePinInputReturn
}

export interface PinInputRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface PinInputRootProviderProps extends HTMLProps<'div'>, RootProviderProps, PinInputRootProviderBaseProps {}

export const PinInputRootProvider = (props: PinInputRootProviderProps) => {
  const [{ value: pinInput }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => pinInput().getRootProps(), localProps)

  return (
    <PinInputProvider value={pinInput}>
      <ark.div {...mergedProps} />
    </PinInputProvider>
  )
}
