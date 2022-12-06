import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { SliderProvider } from './slider-context'
import { useSlider, UseSliderProps } from './use-slider'

export type SliderProps = Assign<HTMLArkProps<'div'>, UseSliderProps>

export const Slider = (props: SliderProps) => {
  const [useSliderProps, divProps] = createSplitProps<UseSliderProps>()(props, [
    'aria-label',
    'aria-labelledby',
    'dir',
    'disabled',
    'focusThumbOnChange',
    'form',
    'getAriaValueText',
    'getRootNode',
    'id',
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
    'readOnly',
    'step',
    'thumbAlignment',
    'value',
  ])
  const slider = useSlider(useSliderProps)

  return (
    <SliderProvider value={slider}>
      <ark.div {...slider().rootProps} {...divProps} />
    </SliderProvider>
  )
}
