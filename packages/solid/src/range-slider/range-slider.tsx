import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { RangeSliderProvider } from './range-slider-context'
import { useRangeSlider, UseRangeSliderProps } from './use-range-slider'

export type RangeSliderProps = Assign<HTMLArkProps<'div'>, UseRangeSliderProps>

export const RangeSlider = (props: RangeSliderProps) => {
  const [useRangeSliderProps, divProps] = createSplitProps<UseRangeSliderProps>()(props, [
    'aria-label',
    'aria-labelledby',
    'dir',
    'disabled',
    'form',
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
    'readOnly',
    'step',
    'thumbAlignment',
    'value',
  ])
  const slider = useRangeSlider(useRangeSliderProps)

  return (
    <RangeSliderProvider value={slider}>
      <ark.div {...slider().rootProps} {...divProps} />
    </RangeSliderProvider>
  )
}
