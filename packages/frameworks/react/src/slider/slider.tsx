import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { SliderProvider, type SliderContext } from './slider-context'
import { useSlider, type UseSliderProps } from './use-slider'

export interface SliderProps
  extends Assign<
    Assign<HTMLArkProps<'div'>, UseSliderProps>,
    { children?: ((context: SliderContext) => ReactNode) | ReactNode }
  > {}

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const { children, ...restProps } = props
  const [useSliderProps, divProps] = createSplitProps<UseSliderProps>()(restProps, [
    'aria-label',
    'aria-labelledby',
    'defaultValue',
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
    'onValueChange',
    'onValueChangeEnd',
    'onValueChangeStart',
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
      <input {...api.hiddenInputProps} />
    </SliderProvider>
  )
})

Slider.displayName = 'Slider'
