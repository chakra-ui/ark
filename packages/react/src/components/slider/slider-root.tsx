import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { type UseSliderProps, useSlider } from './use-slider'
import { SliderProvider } from './use-slider-context'

export interface SliderRootBaseProps extends UseSliderProps, PolymorphicProps {}
export interface SliderRootProps
  extends Assign<HTMLAttributes<HTMLDivElement>, SliderRootBaseProps> {}

export const SliderRoot = forwardRef<HTMLDivElement, SliderRootProps>((props, ref) => {
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
  const slider = useSlider(useSliderProps)
  const mergedProps = mergeProps(slider.getRootProps(), localProps)

  return (
    <SliderProvider value={slider}>
      <ark.div {...mergedProps} ref={ref} />
    </SliderProvider>
  )
})

SliderRoot.displayName = 'SliderRoot'
