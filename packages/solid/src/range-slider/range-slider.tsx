import { type Assign } from '@polymorphic-factory/solid'
import { children, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { RangeSliderProvider } from './range-slider-context'
import {
  useRangeSlider,
  type UseRangeSliderProps,
  type UseRangeSliderReturn,
} from './use-range-slider'

export type RangeSliderProps = Assign<
  HTMLArkProps<'div'>,
  UseRangeSliderProps & {
    children?: JSX.Element | ((api: ReturnType<UseRangeSliderReturn>) => JSX.Element)
  }
>

export const RangeSlider = (props: RangeSliderProps) => {
  const [useRangeSliderProps, divProps] = createSplitProps<UseRangeSliderProps>()(props, [
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
    'onChange',
    'onChangeEnd',
    'onChangeStart',
    'orientation',
    'readOnly',
    'step',
    'thumbAlignment',
    'value',
  ])
  const slider = useRangeSlider(useRangeSliderProps)

  const view = () => children(() => runIfFn(props.children, slider()))
  return (
    <RangeSliderProvider value={slider}>
      <ark.div {...slider().rootProps} {...divProps}>
        {view}
      </ark.div>
    </RangeSliderProvider>
  )
}
