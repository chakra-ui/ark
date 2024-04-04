import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerValueTextProps extends HTMLArkProps<'span'> {}

export const ColorPickerValueText = (props: ColorPickerValueTextProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => colorPickerAnatomy.build().valueText.attrs, props)

  return <ark.span {...mergedProps()}>{api().valueAsString || props.children}</ark.span>
}
