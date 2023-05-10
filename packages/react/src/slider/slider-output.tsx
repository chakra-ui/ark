import { mergeProps } from '@zag-js/react'
import { ark } from '../factory'
import { forwardRef } from '../forward-ref'
import { runIfFn } from '../run-if-fn'
import { useSliderContext, type SliderContext } from './slider-context'

export type SliderOutputProps = {
  children?: ((context: SliderContext) => React.ReactNode) | React.ReactNode
}

export const SliderOutput = forwardRef<'output', SliderOutputProps>((props, ref) => {
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
