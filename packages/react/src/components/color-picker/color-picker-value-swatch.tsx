import type { SwatchProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { ColorPickerSwatchPropsProvider } from './use-color-picker-swatch-props-context'

interface ValueSwatchProps extends Omit<SwatchProps, 'value'> {}

export interface ColorPickerValueSwatchBaseProps extends ValueSwatchProps, PolymorphicProps {}
export interface ColorPickerValueSwatchProps
  extends HTMLProps<'div'>,
    ColorPickerValueSwatchBaseProps {}

export const ColorPickerValueSwatch = forwardRef<HTMLDivElement, ColorPickerValueSwatchProps>(
  (props, ref) => {
    const [{ respectAlpha }, localProps] = createSplitProps<ValueSwatchProps>()(props, [
      'respectAlpha',
    ])
    const colorPicker = useColorPickerContext()
    const swatchProps = {
      respectAlpha,
      value: colorPicker.valueAsString,
    }
    const mergedProps = mergeProps(colorPicker.getSwatchProps(swatchProps), localProps)

    return (
      <ColorPickerSwatchPropsProvider value={swatchProps}>
        <ark.div {...mergedProps} ref={ref} />
      </ColorPickerSwatchPropsProvider>
    )
  },
)

ColorPickerValueSwatch.displayName = 'ColorPickerValueSwatch'
