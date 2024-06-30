import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { colorPickerAnatomy } from './color-picker.anatomy'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerValueTextBaseProps extends PolymorphicProps {}
export interface ColorPickerValueTextProps
  extends HTMLProps<'span'>,
    ColorPickerValueTextBaseProps {}

export const ColorPickerValueText = forwardRef<HTMLDivElement, ColorPickerValueTextProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()

    return (
      <ark.span {...colorPickerAnatomy.build().valueText.attrs} {...props} ref={ref}>
        {props.children || colorPicker.valueAsString}
      </ark.span>
    )
  },
)

ColorPickerValueText.displayName = 'ColorPickerValueText'
