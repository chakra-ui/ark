import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { useSliderContext } from './slider-context'
import { type UseSliderReturn } from './use-slider'

export interface SliderOutputProps
  extends Assign<
    HTMLArkProps<'output'>,
    { children?: ((api: UseSliderReturn) => ReactNode) | ReactNode }
  > {}

export const SliderOutput = forwardRef<HTMLOutputElement, SliderOutputProps>((props, ref) => {
  const { children, ...rest } = props
  const api = useSliderContext()
  const mergedProps = mergeProps(api.outputProps, rest)

  const view = runIfFn(children, api)

  return (
    <ark.output {...mergedProps} ref={ref}>
      {view}
    </ark.output>
  )
})

SliderOutput.displayName = 'SliderOutput'
