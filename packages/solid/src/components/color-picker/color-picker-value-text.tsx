import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerValueTextBaseProps extends PolymorphicProps<'span'> {}
export interface ColorPickerValueTextProps
  extends HTMLProps<'span'>,
    ColorPickerValueTextBaseProps {}

export const ColorPickerValueText = (props: ColorPickerValueTextProps) => {
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(() => colorPicker().getValueTextProps(), props)

  return <ark.span {...mergedProps}>{colorPicker().valueAsString || props.children}</ark.span>
}
