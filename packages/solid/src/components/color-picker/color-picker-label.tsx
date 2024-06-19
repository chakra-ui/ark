import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerLabelBaseProps extends PolymorphicProps<'label'> {}
export interface ColorPickerLabelProps extends HTMLProps<'label'>, ColorPickerLabelBaseProps {}

export const ColorPickerLabel = (props: ColorPickerLabelProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
