import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerFormatTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerFormatTrigger = forwardRef<
  HTMLButtonElement,
  ColorPickerFormatTriggerProps
>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker.formatTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

ColorPickerFormatTrigger.displayName = 'ColorPickerFormatTrigger'
