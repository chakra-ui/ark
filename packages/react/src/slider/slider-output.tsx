import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { type ReactNode } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { useSliderContext, type SliderContext } from './slider-context'

export type SliderOutputProps = Assign<
  HTMLArkProps<'output'>,
  {
    children?: ((context: SliderContext) => ReactNode) | ReactNode
  }
>

export const SliderOutput = forwardRef<'output', SliderOutputProps>((props, ref) => {
  const { children, ...rest } = props
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.outputProps, rest)
  const view = runIfFn(children, slider)
  return (
    <ark.output {...mergedProps} ref={ref}>
      {view}
    </ark.output>
  )
})
