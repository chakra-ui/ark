import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { SliderContext, SliderProvider } from './slider-context'
import { useSlider, UseSliderProps } from './use-slider'

export type SliderProps = Assign<
  Assign<HTMLArkProps<'div'>, UseSliderProps>,
  {
    children?: ((context: SliderContext) => ReactNode) | ReactNode
  }
>

export const Slider = forwardRef<'div', SliderProps>((props, ref) => {
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
  const mergedProps = mergeProps(slider.rootProps, divProps)

  const view = runIfFn(children, slider)
  return (
    <SliderProvider value={slider}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </SliderProvider>
  )
})
