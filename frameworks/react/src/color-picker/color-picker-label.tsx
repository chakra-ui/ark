import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerLabelProps extends HTMLArkProps<'label'> {}

export const ColorPickerLabel = forwardRef<HTMLLabelElement, ColorPickerLabelProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.labelProps, props)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

ColorPickerLabel.displayName = 'ColorPickerLabel'
