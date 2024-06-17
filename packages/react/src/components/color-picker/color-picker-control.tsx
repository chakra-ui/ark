import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerControlBaseProps extends PolymorphicProps {}
export interface ColorPickerControlProps
  extends HTMLAttributes<HTMLDivElement>,
    ColorPickerControlBaseProps {}

export const ColorPickerControl = forwardRef<HTMLDivElement, ColorPickerControlProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getControlProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerControl.displayName = 'ColorPickerControl'
