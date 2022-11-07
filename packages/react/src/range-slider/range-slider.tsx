import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { RangeSliderProvider } from './range-slider-context'
import { useRangeSlider, UseRangeSliderProps } from './use-range-slider'

export type RangeSliderProps = Assign<HTMLArkProps<'div'>, UseRangeSliderProps>

export const RangeSlider = forwardRef<'div', RangeSliderProps>((props, ref) => {
  const [useRangeSliderProps, divProps] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'dir',
    'disabled',
    'getAriaValueText',
    'getRootNode',
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
