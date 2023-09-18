import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerEyeDropperTriggerProps = HTMLArkProps<'button'>

export const ColorPickerEyeDropperTrigger = forwardRef<
  HTMLButtonElement,
  ColorPickerEyeDropperTriggerProps
>((props, ref) => {
  const { eyeDropperTriggerProps } = useColorPickerContext()
  const mergedProps = mergeProps(eyeDropperTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

ColorPickerEyeDropperTrigger.displayName = 'ColorPickerEyeDropperTrigger'
