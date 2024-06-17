import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerSwatchGroupBaseProps extends PolymorphicProps {}
export interface ColorPickerSwatchGroupProps
  extends HTMLProps<'div'>,
    ColorPickerSwatchGroupBaseProps {}

export const ColorPickerSwatchGroup = forwardRef<HTMLDivElement, ColorPickerSwatchGroupProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getSwatchGroupProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerSwatchGroup.displayName = 'ColorPickerSwatchGroup'
