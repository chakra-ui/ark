import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerValueTextProps extends HTMLArkProps<'span'> {}

export const ColorPickerValueText = forwardRef<HTMLDivElement, ColorPickerValueTextProps>(
  (props, ref) => {
    const api = useColorPickerContext()

    return (
      <ark.span {...colorPickerAnatomy.build().valueText.attrs} {...props} ref={ref}>
        {props.children || api.valueAsString}
      </ark.span>
    )
  },
)

ColorPickerValueText.displayName = 'ColorPickerValueText'
