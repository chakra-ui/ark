import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerControlProps extends HTMLArkProps<'div'> {}

export const ColorPickerControl = forwardRef<HTMLDivElement, ColorPickerControlProps>(
  (props, ref) => {
    const api = useColorPickerContext()
    const mergedProps = mergeProps(api.controlProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerControl.displayName = 'ColorPickerControl'
