import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerSwatchGroupBaseProps extends PolymorphicProps<'div'> {}
export interface ColorPickerSwatchGroupProps
  extends HTMLProps<'div'>,
    ColorPickerSwatchGroupBaseProps {}

export const ColorPickerSwatchGroup = (props: ColorPickerSwatchGroupProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getSwatchGroupProps(), props)

  return <ark.div {...mergedProps} />
}
