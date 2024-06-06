import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerHiddenInputProps extends HTMLArkProps<'input'> {}

export const ColorPickerHiddenInput = (props: ColorPickerHiddenInputProps) => {
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(() => colorPicker().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}
