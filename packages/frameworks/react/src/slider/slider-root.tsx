import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { SliderProvider } from './slider-context'
import { useSlider, type UseSliderProps, type UseSliderReturn } from './use-slider'

export interface SliderRootProps
  extends Assign<
    Assign<
      HTMLArkProps<'div'>,
      {
        children?: ReactNode | ((api: UseSliderReturn) => ReactNode)
      }
    >,
    UseSliderProps
  > {}

export const SliderRoot = forwardRef<HTMLDivElement, SliderRootProps>((props, ref) => {
  const [useSliderProps, { children, ...divProps }] = createSplitProps<UseSliderProps>()(props, [
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
    'orientation',
    'origin',
    'readOnly',
    'step',
    'thumbAlignment',
    'thumbAlignment',
    'thumbSize',
    'value',
  ])
  const api = useSlider(useSliderProps)
  const mergedProps = mergeProps(api.rootProps, divProps)

  const view = runIfFn(children, api)
  return (
    <SliderProvider value={api}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </SliderProvider>
  )
})

SliderRoot.displayName = 'SliderRoot'
