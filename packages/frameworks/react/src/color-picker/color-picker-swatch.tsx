import type { ColorSwatchProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'
import { ColorPickerSwatchProvider } from './color-picker-swatch-context'

export interface ColorPickerSwatchProps extends Assign<HTMLArkProps<'button'>, ColorSwatchProps> {}

export const ColorPickerSwatch = forwardRef<HTMLButtonElement, ColorPickerSwatchProps>(
  (props, ref) => {
    const [colorSwatchProps, localProps] = createSplitProps<ColorSwatchProps>()(props, [
      'readOnly',
      'value',
    ])
    const api = useColorPickerContext()
    const mergedProps = mergeProps(api.getSwatchProps(colorSwatchProps), localProps)

    return (
      <ColorPickerSwatchProvider value={colorSwatchProps}>
        <ark.button disabled={colorSwatchProps.readOnly} {...mergedProps} ref={ref} />
      </ColorPickerSwatchProvider>
    )
  },
)

ColorPickerSwatch.displayName = 'ColorPickerSwatch'
