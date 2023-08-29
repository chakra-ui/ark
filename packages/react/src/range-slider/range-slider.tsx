import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { RangeSliderProvider } from './range-slider-context'
import {
  useRangeSlider,
  type UseRangeSliderProps,
  type UseRangeSliderReturn,
} from './use-range-slider'

export type RangeSliderProps = Assign<
  ComponentPropsWithoutRef<typeof ark.div>,
  UseRangeSliderProps & {
    children?: ((api: UseRangeSliderReturn) => ReactNode) | ReactNode
  }
>

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
      'onChange',
      'onChangeEnd',
      'onChangeStart',
      'onFocusChange',
      'orientation',
      'readOnly',
      'step',
      'thumbAlignment',
      'thumbAlignment',
      'thumbSize',
      'value',
    ],
  )
  const slider = useRangeSlider(useRangeSliderProps)
  const mergedProps = mergeProps(slider.rootProps, divProps)

  const view = runIfFn(children, slider)
  return (
    <RangeSliderProvider value={slider}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </RangeSliderProvider>
  )
})

RangeSlider.displayName = 'RangeSlider'
