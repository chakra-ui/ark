import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerValueTextBaseProps extends PolymorphicProps<'span'> {}
export interface ColorPickerValueTextProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    ColorPickerValueTextBaseProps {}

export const ColorPickerValueText = (props: ColorPickerValueTextProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => colorPickerAnatomy.build().valueText.attrs, props)

  return <ark.span {...mergedProps}>{api().valueAsString || props.children}</ark.span>
}
