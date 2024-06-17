import type { SwatchTriggerProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerSwatchTriggerBaseProps
  extends SwatchTriggerProps,
    PolymorphicProps<'button'> {}
export interface ColorPickerSwatchTriggerProps
  extends Assign<HTMLProps<'button'>, ColorPickerSwatchTriggerBaseProps> {}

export const ColorPickerSwatchTrigger = (props: ColorPickerSwatchTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<SwatchTriggerProps>()(props, [
    'value',
    'disabled',
  ])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getSwatchTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} />
}
