import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

type ColorHexFormat = 'hex' | 'hexa'
type ColorFormat = 'rgba' | 'hsla' | 'hsba'
type ColorStringFormat = ColorHexFormat | ColorFormat | 'rgb' | 'hsl' | 'hsb' | 'css'

export interface ColorPickerValueTextBaseProps extends PolymorphicProps {
  format?: ColorStringFormat
}
export interface ColorPickerValueTextProps extends HTMLProps<'span'>, ColorPickerValueTextBaseProps {}

export const ColorPickerValueText = forwardRef<HTMLDivElement, ColorPickerValueTextProps>((props, ref) => {
  const { children, format, ...localprops } = props
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker.getValueTextProps(), localprops)
  const valueAsString = format ? colorPicker.value.toString(format) : colorPicker.valueAsString

  return (
    <ark.span {...mergedProps} ref={ref}>
      {props.children || valueAsString}
    </ark.span>
  )
})

ColorPickerValueText.displayName = 'ColorPickerValueText'
