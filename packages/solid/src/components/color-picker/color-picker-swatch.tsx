import type { SwatchProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { ColorPickerSwatchPropsProvider } from './use-color-picker-swatch-props-context'

export interface ColorPickerSwatchBaseProps extends SwatchProps, PolymorphicProps<'div'> {}
export interface ColorPickerSwatchProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ColorPickerSwatchBaseProps {}

export const ColorPickerSwatch = (props: ColorPickerSwatchProps) => {
  const [swatchProps, localProps] = createSplitProps<SwatchProps>()(props, [
    'respectAlpha',
    'value',
  ])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getSwatchProps(swatchProps), localProps)

  return (
    <ColorPickerSwatchPropsProvider value={swatchProps}>
      <ark.div {...mergedProps} />
    </ColorPickerSwatchPropsProvider>
  )
}
