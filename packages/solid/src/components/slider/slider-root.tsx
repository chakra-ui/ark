import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseSliderProps, useSlider } from './use-slider.ts'
import { SliderProvider } from './use-slider-context.ts'

export interface SliderRootBaseProps extends UseSliderProps, PolymorphicProps<'div'> {}
export interface SliderRootProps extends Assign<HTMLProps<'div'>, SliderRootBaseProps> {}

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
    'largeStep',
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
    'thumbCollisionBehavior',
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
