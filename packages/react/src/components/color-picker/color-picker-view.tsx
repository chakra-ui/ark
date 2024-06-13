import { colorPickerAnatomy } from '@ark-ui/anatomy'
import type { ColorFormat } from '@zag-js/color-picker'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerViewBaseProps {
  format: ColorFormat
}

export interface ColorPickerViewProps extends HTMLArkProps<'div'>, ColorPickerViewBaseProps {}

export const ColorPickerView = forwardRef<HTMLDivElement, ColorPickerViewProps>((props, ref) => {
  const colorPicker = useColorPickerContext()

  if (colorPicker.format !== props.format) {
    return null
  }

  return (
    <ark.div
      ref={ref}
      data-format={props.format}
      {...colorPickerAnatomy.build().view.attrs}
      {...props}
    />
  )
})

ColorPickerView.displayName = 'ColorPickerView'
