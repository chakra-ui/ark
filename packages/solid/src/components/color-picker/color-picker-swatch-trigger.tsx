import type { SwatchTriggerProps, SwatchTriggerState } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerSwatchTriggerState extends SwatchTriggerState {}

export interface ColorPickerSwatchTriggerBaseProps
  extends SwatchTriggerProps, PolymorphicProps<'button', ColorPickerSwatchTriggerState> {}
export interface ColorPickerSwatchTriggerProps extends Assign<HTMLProps<'button'>, ColorPickerSwatchTriggerBaseProps> {}

export const ColorPickerSwatchTrigger = (props: ColorPickerSwatchTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<SwatchTriggerProps>()(props, ['value', 'disabled'])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getSwatchTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} state={api().getSwatchTriggerState(triggerProps)} />
}
