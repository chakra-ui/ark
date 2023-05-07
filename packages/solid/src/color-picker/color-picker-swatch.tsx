import type { ColorSwatchProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSwatchProps = Assign<HTMLArkProps<'button'>, ColorSwatchProps>

export const ColorPickerSwatch = (props: ColorPickerSwatchProps) => {
  const [swatchProps, buttonProps] = createSplitProps<ColorSwatchProps>()(props, [
    'readOnly',
    'value',
  ])
  const colorPicker = useColorPickerContext()
  const mergedProps = createMemo(() =>
    mergeProps(colorPicker().getSwatchProps(swatchProps), buttonProps),
  )

  return (
    <ark.button {...mergedProps} disabled={swatchProps.readOnly}>
      <ark.div {...colorPicker().getSwatchBackgroundProps(swatchProps)} />
    </ark.button>
  )
}
