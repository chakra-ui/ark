import type { ColorSwatchProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'
import { ColorPickerSwatchProvider } from './color-picker-swatch-context'

export type ColorPickerSwatchProps = Assign<HTMLArkProps<'button'>, ColorSwatchProps>

export const ColorPickerSwatch = (props: ColorPickerSwatchProps) => {
  const [colorSwatchProps, localProps] = createSplitProps<ColorSwatchProps>()(props, [
    'readOnly',
    'value',
  ])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getSwatchProps(colorSwatchProps), localProps)

  return (
    <ColorPickerSwatchProvider value={colorSwatchProps}>
      <ark.button {...mergedProps} disabled={colorSwatchProps.readOnly} />
    </ColorPickerSwatchProvider>
  )
}
