import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export type ColorPickerControlBaseProps = {}
export interface ColorPickerControlProps extends HTMLArkProps<'div'>, ColorPickerControlBaseProps {}

export const ColorPickerControl = forwardRef<HTMLDivElement, ColorPickerControlProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getControlProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerControl.displayName = 'ColorPickerControl'
