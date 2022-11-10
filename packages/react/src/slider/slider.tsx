import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { splitProps } from '../split-props'
import type { Assign } from '../types'
import { SliderProvider } from './slider-context'
import { useSlider, UseSliderProps } from './use-slider'

export type SliderProps = Assign<HTMLArkProps<'div'>, UseSliderProps>

export const Slider = forwardRef<'div', SliderProps>((props, ref) => {
  const [useSliderProps, divProps] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'dir',
    'disabled',
    'focusThumbOnChange',
    'getAriaValueText',
    'getRootNode',
    'ids',
    'invalid',
    'max',
    'min',
    'name',
    'onChange',
    'onChangeEnd',
    'onChangeStart',
    'orientation',
    'origin',
    'readonly',
    'step',
    'thumbAlignment',
    'value',
  ])
  const slider = useSlider(useSliderProps)
  const mergedProps = mergeProps(slider.rootProps, divProps)

  return (
    <SliderProvider value={slider}>
      <ark.div {...mergedProps} ref={ref} />
    </SliderProvider>
  )
})
