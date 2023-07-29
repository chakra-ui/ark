import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { runIfFn } from '../run-if-fn'
import { useSliderContext, type SliderContext } from './slider-context'

export type SliderOutputProps = {
  children?: ((context: SliderContext) => React.ReactNode) | React.ReactNode
} & ComponentPropsWithoutRef<typeof ark.output>

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
