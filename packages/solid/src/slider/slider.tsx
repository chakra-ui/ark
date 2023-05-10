import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { SliderProvider } from './slider-context'
import { useSlider, type UseSliderProps, type UseSliderReturn } from './use-slider'

export type SliderProps = Assign<
  HTMLArkProps<'div'>,
  UseSliderProps & {
    children?: ((api: UseSliderReturn) => JSX.Element) | JSX.Element
  }
>

export const Slider = (props: SliderProps) => {
  const [sliderParams, restProps] = createSplitProps<UseSliderProps>()(props, [
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

  const api = useSlider(sliderParams)
  const rootProps = mergeProps(() => api().rootProps, restProps)

  const getChildren = () => runIfFn(restProps.children, api)

  return (
    <SliderProvider value={api}>
      <ark.div {...rootProps}>{getChildren()}</ark.div>
    </SliderProvider>
  )
}
