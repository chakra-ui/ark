import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerValueTextBaseProps extends PolymorphicProps {}
export interface ColorPickerValueTextProps
  extends HTMLAttributes<HTMLSpanElement>,
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
