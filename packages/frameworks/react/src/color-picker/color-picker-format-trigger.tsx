import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerFormatTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerFormatTrigger = forwardRef<
  HTMLButtonElement,
  ColorPickerFormatTriggerProps
>((props, ref) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(api.formatTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

ColorPickerFormatTrigger.displayName = 'ColorPickerFormatTrigger'
