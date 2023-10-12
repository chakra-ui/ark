import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerLabelProps extends HTMLArkProps<'label'> {}

export const ColorPickerLabel = forwardRef<HTMLLabelElement, ColorPickerLabelProps>(
  (props, ref) => {
    const api = useColorPickerContext()
    const mergedProps = mergeProps(api.labelProps, props)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

ColorPickerLabel.displayName = 'ColorPickerLabel'
