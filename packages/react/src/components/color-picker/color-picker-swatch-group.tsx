import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export type ColorPickerSwatchGroupBaseProps = {}
export interface ColorPickerSwatchGroupProps
  extends HTMLArkProps<'div'>,
    ColorPickerSwatchGroupBaseProps {}

export const ColorPickerSwatchGroup = forwardRef<HTMLDivElement, ColorPickerSwatchGroupProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getSwatchGroupProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerSwatchGroup.displayName = 'ColorPickerSwatchGroup'
