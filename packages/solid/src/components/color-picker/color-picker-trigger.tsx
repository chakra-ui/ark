import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface ColorPickerTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    ColorPickerTriggerBaseProps {}

export const ColorPickerTrigger = (props: ColorPickerTriggerProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
