import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerTrigger = forwardRef<HTMLButtonElement, ColorPickerTriggerProps>(
  (props, ref) => {
    const context = useColorPickerContext()
    const mergedProps = mergeProps(context.triggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

ColorPickerTrigger.displayName = 'ColorPickerTrigger'
