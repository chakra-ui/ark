import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerTrigger = (props: ColorPickerTriggerProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().triggerProps, props)

  return <ark.button {...mergedProps} />
}
