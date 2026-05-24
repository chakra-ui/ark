'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseSliderProps, useSlider } from './use-slider.ts'
import { SliderProvider } from './use-slider-context.ts'

export interface SliderRootBaseProps extends UseSliderProps, PolymorphicProps {}
export interface SliderRootProps extends Assign<HTMLProps<'div'>, SliderRootBaseProps> {}

const splitRootProps = createSplitProps<UseSliderProps>()

export const SliderRoot = forwardRef<HTMLDivElement, SliderRootProps>((props, ref) => {
  const [useSliderProps, localProps] = splitRootProps(props, [
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
    'thumbCollisionBehavior',
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
