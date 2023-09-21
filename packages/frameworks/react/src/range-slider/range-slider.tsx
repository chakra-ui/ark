import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { RangeSliderProvider } from './range-slider-context'
import {
  useRangeSlider,
  type UseRangeSliderProps,
  type UseRangeSliderReturn,
} from './use-range-slider'

export interface RangeSliderProps
  extends Assign<
    HTMLArkProps<'div'>,
    UseRangeSliderProps & {
      children?: ((api: UseRangeSliderReturn) => ReactNode) | ReactNode
    }
  > {}

export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>((props, ref) => {
  const [useRangeSliderProps, { children, ...divProps }] = createSplitProps<UseRangeSliderProps>()(
    props,
    [
      'aria-label',
      'aria-labelledby',
      'defaultValue',
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
      'onValueChangeStart',
      'orientation',
      'readOnly',
      'step',
      'thumbAlignment',
      'thumbAlignment',
      'thumbSize',
      'value',
    ],
  )
  const api = useRangeSlider(useRangeSliderProps)
  const mergedProps = mergeProps(api.rootProps, divProps)

  const view = runIfFn(children, api)
  return (
    <RangeSliderProvider value={api}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </RangeSliderProvider>
  )
})

RangeSlider.displayName = 'RangeSlider'
