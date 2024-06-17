import { mergeProps } from '@zag-js/react'
import { type InputHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerHiddenInputBaseProps extends PolymorphicProps {}
export interface ColorPickerHiddenInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    ColorPickerHiddenInputBaseProps {}

export const ColorPickerHiddenInput = forwardRef<HTMLInputElement, ColorPickerHiddenInputProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getHiddenInputProps(), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

ColorPickerHiddenInput.displayName = 'ColorPickerHiddenInput'
