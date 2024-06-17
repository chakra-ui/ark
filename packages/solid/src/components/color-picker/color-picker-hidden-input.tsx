import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface ColorPickerHiddenInputProps
  extends HTMLProps<'input'>,
    ColorPickerHiddenInputBaseProps {}

export const ColorPickerHiddenInput = (props: ColorPickerHiddenInputProps) => {
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(() => colorPicker().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}
