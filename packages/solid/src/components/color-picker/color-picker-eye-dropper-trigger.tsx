import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerEyeDropperTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface ColorPickerEyeDropperTriggerProps
  extends HTMLProps<'button'>,
    ColorPickerEyeDropperTriggerBaseProps {}

export const ColorPickerEyeDropperTrigger = (props: ColorPickerEyeDropperTriggerProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getEyeDropperTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
