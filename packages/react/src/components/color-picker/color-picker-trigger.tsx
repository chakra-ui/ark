import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export type ColorPickerTriggerBaseProps = {}
export interface ColorPickerTriggerProps
  extends HTMLArkProps<'button'>,
    ColorPickerTriggerBaseProps {}

export const ColorPickerTrigger = forwardRef<HTMLButtonElement, ColorPickerTriggerProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

ColorPickerTrigger.displayName = 'ColorPickerTrigger'
