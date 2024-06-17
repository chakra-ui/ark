import { mergeProps } from '@zag-js/react'
import { type SelectHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerFormatSelectBaseProps extends PolymorphicProps {}
export interface ColorPickerFormatSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
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
