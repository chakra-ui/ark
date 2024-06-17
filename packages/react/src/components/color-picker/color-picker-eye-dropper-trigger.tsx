import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerEyeDropperTriggerBaseProps extends PolymorphicProps {}
export interface ColorPickerEyeDropperTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ColorPickerEyeDropperTriggerBaseProps {}

export const ColorPickerEyeDropperTrigger = forwardRef<
  HTMLButtonElement,
  ColorPickerEyeDropperTriggerProps
>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker.getEyeDropperTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

ColorPickerEyeDropperTrigger.displayName = 'ColorPickerEyeDropperTrigger'
