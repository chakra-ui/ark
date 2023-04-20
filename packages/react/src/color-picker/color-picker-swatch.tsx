import { forwardRef } from '@polymorphic-factory/react'
import type { SwatchProps } from '@zag-js/color-picker/dist/color-picker.types'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSwatchProps = HTMLArkProps<'button'> & SwatchProps

export const ColorPickerSwatch = forwardRef<'button', ColorPickerSwatchProps>((props, ref) => {
  const [swatchProps, buttonProps] = createSplitProps<SwatchProps>()(props, ['readOnly', 'value'])
  const { getSwatchProps, getSwatchBackgroundProps } = useColorPickerContext()
  const mergedProps = mergeProps(getSwatchProps(swatchProps), buttonProps)

  return (
    <ark.button {...mergedProps} ref={ref} disabled={swatchProps.readOnly}>
      <ark.div {...getSwatchBackgroundProps(swatchProps)} />
    </ark.button>
  )
})
