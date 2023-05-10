import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerEyeDropperTriggerProps = HTMLArkProps<'button'>

export const ColorPickerEyeDropperTrigger = forwardRef<'button'>((props, ref) => {
  const { eyeDropperTriggerProps } = useColorPickerContext()
  const mergedProps = mergeProps(eyeDropperTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
