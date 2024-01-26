import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { SliderProvider } from './slider-context'
import { useSlider, type UseSliderProps, type UseSliderReturn } from './use-slider'

interface ElementProps extends UseSliderProps {
  children?: JSX.Element | ((api: UseSliderReturn) => JSX.Element)
}

export interface SliderRootProps extends Assign<HTMLArkProps<'div'>, ElementProps> {}

export const SliderRoot: ArkComponent<'div', ElementProps> = (props: SliderRootProps) => {
  const [sliderParams, restProps] = createSplitProps<UseSliderProps>()(props, [
    'aria-label',
    'aria-labelledby',
    'dir',
    'disabled',
    'form',
    'getAriaValueText',
    'getRootNode',
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
  const api = useSlider(sliderParams)
  const mergedProps = mergeProps(() => api().rootProps, restProps)
  const getChildren = () => runIfFn(restProps.children, api)

  return (
    <SliderProvider value={api}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </SliderProvider>
  )
}
