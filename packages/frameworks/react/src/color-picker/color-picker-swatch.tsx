import type { SwatchProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './use-color-picker-context'
import { ColorPickerSwatchProvider } from './use-color-picker-swatch-context'

export interface ColorPickerSwatchProps extends Assign<HTMLArkProps<'div'>, SwatchProps> {}

export const ColorPickerSwatch = forwardRef<HTMLDivElement, ColorPickerSwatchProps>(
  (props, ref) => {
    const [swatwchProps, localProps] = createSplitProps<SwatchProps>()(props, [
      'respectAlpha',
      'value',
    ])
    const context = useColorPickerContext()
    const mergedProps = mergeProps(context.getSwatchProps(swatwchProps), localProps)

    return (
      <ColorPickerSwatchProvider value={swatwchProps}>
        <ark.div {...mergedProps} ref={ref} />
      </ColorPickerSwatchProvider>
    )
  },
)

ColorPickerSwatch.displayName = 'ColorPickerSwatch'
