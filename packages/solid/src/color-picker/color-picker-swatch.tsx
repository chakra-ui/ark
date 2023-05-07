import type { ColorSwatchProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSwatchProps = Assign<HTMLArkProps<'button'>, ColorSwatchProps>

export const ColorPickerSwatch = (props: ColorPickerSwatchProps) => {
  const [colorSwatchProps, localProps] = createSplitProps<ColorSwatchProps>()(props, [
    'readOnly',
    'value',
  ])

  const colorPicker = useColorPickerContext()
  const swatchProps = mergeProps(() => colorPicker().getSwatchProps(colorSwatchProps), localProps)

  return (
    <ark.button {...swatchProps} disabled={colorSwatchProps.readOnly}>
      <ark.div {...colorPicker().getSwatchBackgroundProps(colorSwatchProps)} />
    </ark.button>
  )
}
