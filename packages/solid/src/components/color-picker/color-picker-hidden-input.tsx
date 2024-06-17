import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface ColorPickerHiddenInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement>,
    ColorPickerHiddenInputBaseProps {}

export const ColorPickerHiddenInput = (props: ColorPickerHiddenInputProps) => {
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(() => colorPicker().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}
