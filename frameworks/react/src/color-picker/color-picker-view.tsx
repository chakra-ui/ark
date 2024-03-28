import { colorPickerAnatomy } from '@ark-ui/anatomy'
import type { ColorFormat } from '@zag-js/color-picker'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerViewProps extends HTMLArkProps<'div'> {
  format: ColorFormat
}

export const ColorPickerView = forwardRef<HTMLDivElement, ColorPickerViewProps>((props, ref) => {
  const context = useColorPickerContext()

  if (context.format !== props.format) {
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
