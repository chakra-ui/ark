import { forwardRef } from '@polymorphic-factory/react'
import type { ColorSwatchProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSwatchProps = HTMLArkProps<'button'> & ColorSwatchProps

export const ColorPickerSwatch = forwardRef<'button', ColorPickerSwatchProps>((props, ref) => {
  const [swatchProps, buttonProps] = createSplitProps<ColorSwatchProps>()(props, [
    'readOnly',
    'value',
  ])
  const { getSwatchProps, getSwatchBackgroundProps } = useColorPickerContext()
  const mergedProps = mergeProps(getSwatchProps(swatchProps), buttonProps)

  return (
    <ark.button {...mergedProps} ref={ref} disabled={swatchProps.readOnly}>
      <ark.div {...getSwatchBackgroundProps(swatchProps)} />
    </ark.button>
  )
})
