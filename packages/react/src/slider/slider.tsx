import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { SliderProvider } from './slider-context'
import { useSlider, UseSliderProps } from './use-slider'

export type SliderProps = Assign<HTMLAtlasProps<'div'>, UseSliderProps>

export const Slider = forwardRef<'div', SliderProps>((props, ref) => {
  const [useSliderProps, rootProps] = splitProps(props, [
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

  return (
    <SliderProvider value={slider}>
      <atlas.div {...slider.rootProps} {...rootProps} ref={ref} />
    </SliderProvider>
  )
})
