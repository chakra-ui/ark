import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useSliderContext, type SliderContext } from './slider-context'

export interface SliderOutputProps
  extends Assign<
    HTMLArkProps<'output'>,
    { children?: ((context: SliderContext) => React.ReactNode) | React.ReactNode }
  > {}

export const SliderOutput = forwardRef<HTMLOutputElement, SliderOutputProps>((props, ref) => {
  const { children, ...restProps } = props

  const api = useSliderContext()
  const mergedProps = mergeProps(api.outputProps, restProps)
  const view = runIfFn(children, api)

  return (
    <ark.output {...mergedProps} ref={ref}>
      {view ?? api.value}
    </ark.output>
  )
})

SliderOutput.displayName = 'SliderOutput'
