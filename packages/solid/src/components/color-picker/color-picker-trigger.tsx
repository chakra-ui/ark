import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerTrigger = (props: ColorPickerTriggerProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
