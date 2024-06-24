import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from '../field'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerHiddenInputBaseProps extends PolymorphicProps {}
export interface ColorPickerHiddenInputProps
  extends HTMLProps<'input'>,
    ColorPickerHiddenInputBaseProps {}

export const ColorPickerHiddenInput = forwardRef<HTMLInputElement, ColorPickerHiddenInputProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getHiddenInputProps(), props)
    const field = useFieldContext()

    return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
  },
)

ColorPickerHiddenInput.displayName = 'ColorPickerHiddenInput'
