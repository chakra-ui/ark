import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerEyeDropperTriggerBaseProps extends PolymorphicProps {}
export interface ColorPickerEyeDropperTriggerProps
  extends HTMLProps<'button'>,
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
