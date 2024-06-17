import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerTriggerBaseProps extends PolymorphicProps {}
export interface ColorPickerTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ColorPickerTriggerBaseProps {}

export const ColorPickerTrigger = forwardRef<HTMLButtonElement, ColorPickerTriggerProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

ColorPickerTrigger.displayName = 'ColorPickerTrigger'
