import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerFormatTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerFormatTrigger = forwardRef<
  HTMLButtonElement,
  ColorPickerFormatTriggerProps
>((props, ref) => {
  const context = useColorPickerContext()
  const mergedProps = mergeProps(context.formatTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

ColorPickerFormatTrigger.displayName = 'ColorPickerFormatTrigger'
