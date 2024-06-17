import type { SwatchTriggerProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerSwatchTriggerBaseProps extends SwatchTriggerProps, PolymorphicProps {}
export interface ColorPickerSwatchTriggerProps
  extends Assign<ButtonHTMLAttributes<HTMLButtonElement>, ColorPickerSwatchTriggerBaseProps> {}

export const ColorPickerSwatchTrigger = forwardRef<
  HTMLButtonElement,
  ColorPickerSwatchTriggerProps
>((props, ref) => {
  const [triggerProps, localProps] = createSplitProps<SwatchTriggerProps>()(props, [
    'value',
    'disabled',
  ])
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker.getSwatchTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

ColorPickerSwatchTrigger.displayName = 'ColorPickerSwatchTrigger'
