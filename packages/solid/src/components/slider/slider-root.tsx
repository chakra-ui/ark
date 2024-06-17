import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { type UseSliderProps, useSlider } from './use-slider'
import { SliderProvider } from './use-slider-context'

export interface SliderRootBaseProps extends UseSliderProps, PolymorphicProps<'div'> {}
export interface SliderRootProps
  extends Assign<JSX.HTMLAttributes<HTMLDivElement>, SliderRootBaseProps> {}

export const SliderRoot = (props: SliderRootProps) => {
  const [useSliderProps, localProps] = createSplitProps<UseSliderProps>()(props, [
    'aria-label',
    'aria-labelledby',
    'defaultValue',
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
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <SliderProvider value={api}>
      <ark.div {...mergedProps} />
    </SliderProvider>
  )
}
