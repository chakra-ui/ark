import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerEyeDropperTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerEyeDropperTrigger = forwardRef<
  HTMLButtonElement,
  ColorPickerEyeDropperTriggerProps
>((props, ref) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(api.eyeDropperTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

ColorPickerEyeDropperTrigger.displayName = 'ColorPickerEyeDropperTrigger'
