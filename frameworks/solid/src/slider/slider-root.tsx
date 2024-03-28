import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSlider, type UseSliderProps } from './use-slider'
import { SliderProvider } from './use-slider-context'

export interface SliderRootProps extends Assign<HTMLArkProps<'div'>, UseSliderProps> {}

export const SliderRoot = (props: SliderRootProps) => {
  const [sliderParams, restProps] = createSplitProps<UseSliderProps>()(props, [
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
    'onFocusChange',
    'onValueChange',
    'onValueChangeEnd',
    'orientation',
    'origin',
    'readOnly',
    'step',
    'thumbAlignment',
    'thumbAlignment',
    'thumbSize',
    'value',
  ])
  const api = useSlider(sliderParams)
  const mergedProps = mergeProps(() => api().rootProps, restProps)

  return (
    <SliderProvider value={api}>
      <ark.div {...mergedProps} />
    </SliderProvider>
  )
}
