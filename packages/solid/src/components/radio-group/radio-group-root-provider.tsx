import type { RootState } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseRadioGroupReturn } from './use-radio-group.ts'
import { RadioGroupProvider } from './use-radio-group-context.ts'

interface RootProviderProps {
  value: UseRadioGroupReturn
}

export interface RadioGroupRootProviderState extends RootState {}

export interface RadioGroupRootProviderBaseProps extends PolymorphicProps<'div', RadioGroupRootProviderState> {}
export interface RadioGroupRootProviderProps
  extends HTMLProps<'div'>, RootProviderProps, RadioGroupRootProviderBaseProps {}

export const RadioGroupRootProvider = (props: RadioGroupRootProviderProps) => {
  const [{ value: radioGroup }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => radioGroup().getRootProps(), localProps)

  return (
    <RadioGroupProvider value={radioGroup}>
      <ark.div {...mergedProps} state={radioGroup().getRootState()} />
    </RadioGroupProvider>
  )
}
