import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerControlProps extends HTMLArkProps<'div'> {}

export const ColorPickerControl = forwardRef<HTMLDivElement, ColorPickerControlProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.controlProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerControl.displayName = 'ColorPickerControl'
