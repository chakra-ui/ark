import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerControlBaseProps extends PolymorphicProps<'div'> {}
export interface ColorPickerControlProps extends HTMLProps<'div'>, ColorPickerControlBaseProps {}

export const ColorPickerControl = (props: ColorPickerControlProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
