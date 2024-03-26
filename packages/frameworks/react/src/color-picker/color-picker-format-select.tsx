import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerFormatSelectProps extends HTMLArkProps<'select'> {}

export const ColorPickerFormatSelect = forwardRef<HTMLSelectElement, ColorPickerFormatSelectProps>(
  (props, ref) => {
    const context = useColorPickerContext()
    const mergedProps = mergeProps(context.formatSelectProps, props)

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
