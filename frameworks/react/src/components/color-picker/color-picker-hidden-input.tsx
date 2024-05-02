import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerHiddenInputProps extends HTMLArkProps<'input'> {}

export const ColorPickerHiddenInput = forwardRef<HTMLInputElement, ColorPickerHiddenInputProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.hiddenInputProps, props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

ColorPickerHiddenInput.displayName = 'ColorPickerHiddenInput'
