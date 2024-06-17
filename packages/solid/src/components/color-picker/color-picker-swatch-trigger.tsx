import type { SwatchTriggerProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerSwatchTriggerBaseProps
  extends SwatchTriggerProps,
    PolymorphicProps<'button'> {}
export interface ColorPickerSwatchTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    ColorPickerSwatchTriggerBaseProps {}

export const ColorPickerSwatchTrigger = (props: ColorPickerSwatchTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<SwatchTriggerProps>()(props, [
    'value',
    'disabled',
  ])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getSwatchTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} />
}
