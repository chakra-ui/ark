import { forwardRef } from '@polymorphic-factory/react'
import type { SwatchProps } from '@zag-js/color-picker/dist/color-picker.types'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSwatchBackgroundProps = HTMLArkProps<'div'> & SwatchProps

export const ColorPickerSwatchBackground = forwardRef<'div', ColorPickerSwatchBackgroundProps>(
  (props, ref) => {
    const { value, readOnly, ...rest } = props
    const { getSwatchBackgroundProps } = useColorPickerContext()
    const mergedProps = mergeProps(getSwatchBackgroundProps({ value, readOnly }), rest)

    return <ark.div {...mergedProps} ref={ref} />
  },
)
