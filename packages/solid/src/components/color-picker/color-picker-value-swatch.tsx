import type { SwatchProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { ColorPickerSwatchPropsProvider } from './use-color-picker-swatch-props-context.ts'

interface ValueSwatchProps extends Omit<SwatchProps, 'value'> {}

export interface ColorPickerValueSwatchBaseProps extends ValueSwatchProps, PolymorphicProps<'div'> {}
export interface ColorPickerValueSwatchProps extends HTMLProps<'div'>, ColorPickerValueSwatchBaseProps {}

export const ColorPickerValueSwatch = (props: ColorPickerValueSwatchProps) => {
  const [{ respectAlpha }, localProps] = createSplitProps<ValueSwatchProps>()(props, ['respectAlpha'])
  const colorPicker = useColorPickerContext()
  const swatchProps = createMemo(() => ({
    respectAlpha,
    value: colorPicker().value,
  }))
  const mergedProps = mergeProps(() => colorPicker().getSwatchProps(swatchProps()), localProps)

  return (
    <ColorPickerSwatchPropsProvider value={swatchProps()}>
      <ark.div {...mergedProps} />
    </ColorPickerSwatchPropsProvider>
  )
}
