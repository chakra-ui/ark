import type { Assign } from '@polymorphic-factory/solid'
import type { SwatchProps } from '@zag-js/color-picker/dist/color-picker.types'
import { mergeProps } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSwatchProps = Assign<HTMLArkProps<'button'>, SwatchProps>

export const ColorPickerSwatch = (props: ColorPickerSwatchProps) => {
  const [swatchProps, buttonProps] = createSplitProps<SwatchProps>()(props, ['readOnly', 'value'])
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker().getSwatchProps(swatchProps), buttonProps)

  return (
    <ark.button {...mergedProps} disabled={swatchProps.readOnly}>
      <ark.div {...colorPicker().getSwatchBackgroundProps(swatchProps)} />
    </ark.button>
  )
}
