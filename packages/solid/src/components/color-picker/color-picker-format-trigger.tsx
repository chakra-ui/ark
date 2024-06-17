import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerFormatTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface ColorPickerFormatTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    ColorPickerFormatTriggerBaseProps {}

export const ColorPickerFormatTrigger = (props: ColorPickerFormatTriggerProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getFormatTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
