import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseRadioGroupReturn } from './use-radio-group'
import { RadioGroupProvider } from './use-radio-group-context'

interface RootProviderProps {
  value: UseRadioGroupReturn
}

export interface RadioGroupRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface RadioGroupRootProviderProps
  extends HTMLProps<'div'>,
    RootProviderProps,
    RadioGroupRootProviderBaseProps {}

export const RadioGroupRootProvider = (props: RadioGroupRootProviderProps) => {
  const [{ value: radioGroup }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => radioGroup().getRootProps(), localProps)

  return (
    <RadioGroupProvider value={radioGroup}>
      <ark.div {...mergedProps} />
    </RadioGroupProvider>
  )
}
