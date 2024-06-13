import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export type ColorPickerLabelBaseProps = {}
export interface ColorPickerLabelProps extends HTMLArkProps<'label'>, ColorPickerLabelBaseProps {}

export const ColorPickerLabel = forwardRef<HTMLLabelElement, ColorPickerLabelProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getLabelProps(), props)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

ColorPickerLabel.displayName = 'ColorPickerLabel'
