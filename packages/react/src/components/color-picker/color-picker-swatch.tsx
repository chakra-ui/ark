import type { SwatchProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { ColorPickerSwatchPropsProvider } from './use-color-picker-swatch-props-context'

export interface ColorPickerSwatchBaseProps extends SwatchProps, PolymorphicProps {}
export interface ColorPickerSwatchProps
  extends HTMLAttributes<HTMLDivElement>,
    ColorPickerSwatchBaseProps {}

export const ColorPickerSwatch = forwardRef<HTMLDivElement, ColorPickerSwatchProps>(
  (props, ref) => {
    const [swatwchProps, localProps] = createSplitProps<SwatchProps>()(props, [
      'respectAlpha',
      'value',
    ])
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getSwatchProps(swatwchProps), localProps)

    return (
      <ColorPickerSwatchPropsProvider value={swatwchProps}>
        <ark.div {...mergedProps} ref={ref} />
      </ColorPickerSwatchPropsProvider>
    )
  },
)

ColorPickerSwatch.displayName = 'ColorPickerSwatch'
