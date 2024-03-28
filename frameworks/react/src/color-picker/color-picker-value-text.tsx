import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerValueTextProps extends HTMLArkProps<'span'> {}

export const ColorPickerValueText = forwardRef<HTMLDivElement, ColorPickerValueTextProps>(
  (props, ref) => {
    const context = useColorPickerContext()

    return (
      <ark.span {...colorPickerAnatomy.build().valueText.attrs} {...props} ref={ref}>
        {props.children || context.valueAsString}
      </ark.span>
    )
  },
)

ColorPickerValueText.displayName = 'ColorPickerValueText'
