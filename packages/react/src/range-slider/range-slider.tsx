import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { RangeSliderProvider } from './range-slider-context'
import { useRangeSlider, UseRangeSliderProps } from './use-range-slider'

export type RangeSliderProps = Assign<HTMLArkProps<'div'>, UseRangeSliderProps>

export const RangeSlider = forwardRef<'div', RangeSliderProps>((props, ref) => {
  const [useRangeSliderProps, divProps] = createSplitProps<UseRangeSliderProps>()(props, [
    'aria-label',
    'aria-labelledby',
    'defaultValue',
    'dir',
    'disabled',
    'getAriaValueText',
    'getRootNode',
    'id',
    'ids',
    'invalid',
    'max',
    'min',
    'minStepsBetweenThumbs',
    'name',
    'onChange',
    'onChangeEnd',
    'onChangeStart',
    'orientation',
    'readonly',
    'step',
    'thumbAlignment',
    'value',
    'values',
  ])
  const slider = useRangeSlider(useRangeSliderProps)
  const mergedProps = mergeProps(slider.rootProps, divProps)

  return (
    <RangeSliderProvider value={slider}>
      <ark.div {...mergedProps} ref={ref} />
    </RangeSliderProvider>
  )
})
