import type { SwatchProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerSwatchIndicatorProps extends Assign<HTMLArkProps<'div'>, SwatchProps> {}

export const ColorPickerSwatchIndicator = (props: ColorPickerSwatchIndicatorProps) => {
  const [indicatorProps, localProps] = createSplitProps<SwatchProps>()(props, [
    'value',
    'respectAlpha',
  ])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getSwatchIndicatorProps(indicatorProps), localProps)

  return <ark.div {...mergedProps} />
}
