import type { SwatchProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerSwatchIndicatorProps extends Assign<HTMLArkProps<'div'>, SwatchProps> {}

export const ColorPickerSwatchIndicator = forwardRef<
  HTMLDivElement,
  ColorPickerSwatchIndicatorProps
>((props, ref) => {
  const [triggerProps, localProps] = createSplitProps<SwatchProps>()(props, [
    'value',
    'respectAlpha',
  ])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(api.getSwatchIndicatorProps(triggerProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerSwatchIndicator.displayName = 'ColorPickerSwatchIndicator'
