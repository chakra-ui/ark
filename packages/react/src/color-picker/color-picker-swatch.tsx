import { forwardRef } from '@polymorphic-factory/react'
import type { SwatchProps } from '@zag-js/color-picker/dist/color-picker.types'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSwatchProps = HTMLArkProps<'div'> & SwatchProps

export const ColorPickerSwatch = forwardRef<'div', ColorPickerSwatchProps>((props, ref) => {
  const { value, readOnly, ...rest } = props
  const { getSwatchProps } = useColorPickerContext()
  const mergedProps = mergeProps(getSwatchProps({ value, readOnly }), rest)

  return <ark.div {...mergedProps} ref={ref} />
})
