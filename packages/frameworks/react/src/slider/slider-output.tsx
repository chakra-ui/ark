import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useSliderContext, type SliderContext } from './slider-context'

export type SliderOutputProps = Assign<
  HTMLArkProps<'output'>,
  { children?: ((context: SliderContext) => React.ReactNode) | React.ReactNode }
>

export const SliderOutput = forwardRef<HTMLOutputElement, SliderOutputProps>((props, ref) => {
  const { children, ...restProps } = props
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.outputProps, restProps)
  const view = runIfFn(children, slider)

  return (
    <ark.output {...mergedProps} ref={ref}>
      {view ?? slider.value}
    </ark.output>
  )
})

SliderOutput.displayName = 'SliderOutput'
