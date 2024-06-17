import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerFormatTriggerBaseProps extends PolymorphicProps {}
export interface ColorPickerFormatTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ColorPickerFormatTriggerBaseProps {}

export const ColorPickerFormatTrigger = forwardRef<
  HTMLButtonElement,
  ColorPickerFormatTriggerProps
>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker.getFormatTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

ColorPickerFormatTrigger.displayName = 'ColorPickerFormatTrigger'
