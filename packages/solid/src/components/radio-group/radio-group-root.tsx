import type { RootState } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseRadioGroupProps, useRadioGroup } from './use-radio-group.ts'
import { RadioGroupProvider } from './use-radio-group-context.ts'

export interface RadioGroupRootState extends RootState {}

export interface RadioGroupRootBaseProps extends UseRadioGroupProps, PolymorphicProps<'div', RadioGroupRootState> {}
export interface RadioGroupRootProps extends HTMLProps<'div'>, RadioGroupRootBaseProps {}

export const RadioGroupRoot = (props: RadioGroupRootProps) => {
  const [useRadioGroupProps, localProps] = createSplitProps<UseRadioGroupProps>()(props, [
    'defaultValue',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'name',
    'onValueChange',
    'orientation',
    'readOnly',
    'required',
    'value',
  ])

  const radioGroup = useRadioGroup(useRadioGroupProps)
  const mergedProps = mergeProps(() => radioGroup().getRootProps(), localProps)

  return (
    <RadioGroupProvider value={radioGroup}>
      <ark.div {...mergedProps} state={radioGroup().getRootState()} />
    </RadioGroupProvider>
  )
}
