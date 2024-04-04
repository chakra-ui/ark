import type { SwatchProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './use-color-picker-context'
import { ColorPickerSwatchProvider } from './use-color-picker-swatch-context'

export interface ColorPickerSwatchProps extends Assign<HTMLArkProps<'div'>, SwatchProps> {}

export const ColorPickerSwatch = (props: ColorPickerSwatchProps) => {
  const [swatchProps, localProps] = createSplitProps<SwatchProps>()(props, [
    'respectAlpha',
    'value',
  ])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getSwatchProps(swatchProps), localProps)

  return (
    <ColorPickerSwatchProvider value={swatchProps}>
      <ark.div {...mergedProps()} />
    </ColorPickerSwatchProvider>
  )
}
