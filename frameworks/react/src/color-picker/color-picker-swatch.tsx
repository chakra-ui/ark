import type { SwatchProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './use-color-picker-context'
import { ColorPickerSwatchPropsProvider } from './use-color-picker-swatch-props-context'

export interface ColorPickerSwatchProps extends Assign<HTMLArkProps<'div'>, SwatchProps> {}

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
