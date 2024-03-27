import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

interface ElementProps {
  placeholder?: string
}

export interface ColorPickerValueTextProps extends HTMLArkProps<'span'>, ElementProps {}

export const ColorPickerValueText = (props: ColorPickerValueTextProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => colorPickerAnatomy.build().valueText.attrs, props)

  return <ark.span {...mergedProps}>{api().valueAsString || props.children}</ark.span>
}
