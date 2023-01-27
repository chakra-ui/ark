import type { Assign } from '@polymorphic-factory/solid'
import { children, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { SliderProvider } from './slider-context'
import { useSlider, type UseSliderProps, type UseSliderReturn } from './use-slider'

export type SliderProps = Assign<
  HTMLArkProps<'div'>,
  UseSliderProps & {
    children?: ((api: ReturnType<UseSliderReturn>) => JSX.Element) | JSX.Element
  }
>

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

  const view = () => children(() => runIfFn(divProps.children, slider()))
  return (
    <SliderProvider value={slider}>
      <ark.div {...slider().rootProps} {...divProps}>
        {view}
      </ark.div>
    </SliderProvider>
  )
}
