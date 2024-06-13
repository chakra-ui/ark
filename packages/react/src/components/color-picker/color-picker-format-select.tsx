import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export type ColorPickerFormatSelectBaseProps = {}
export interface ColorPickerFormatSelectProps
  extends HTMLArkProps<'select'>,
    ColorPickerFormatSelectBaseProps {}

export const ColorPickerFormatSelect = forwardRef<HTMLSelectElement, ColorPickerFormatSelectProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getFormatSelectProps(), props)

    return (
      <ark.select {...mergedProps} ref={ref}>
        {['rgba', 'hsla', 'hsba'].map((format) => (
          <ark.option key={format} value={format}>
            {format}
          </ark.option>
        ))}
      </ark.select>
    )
  },
)

ColorPickerFormatSelect.displayName = 'ColorPickerFormatSelect'
