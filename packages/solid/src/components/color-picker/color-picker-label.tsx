import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerLabelBaseProps extends PolymorphicProps<'label'> {}
export interface ColorPickerLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    ColorPickerLabelBaseProps {}

export const ColorPickerLabel = (props: ColorPickerLabelProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
