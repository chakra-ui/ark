import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseSliderProps, useSlider } from './use-slider'
import { SliderProvider } from './use-slider-context'

export interface SliderRootProps extends Assign<HTMLArkProps<'div'>, UseSliderProps> {}

export const SliderRoot = (props: SliderRootProps) => {
  const [useSliderProps, localProps] = createSplitProps<UseSliderProps>()(props, [
    'aria-label',
    'aria-labelledby',
    'disabled',
    'form',
    'getAriaValueText',
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
  const api = useSlider(useSliderProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <SliderProvider value={api}>
      <ark.div {...mergedProps} />
    </SliderProvider>
  )
}
