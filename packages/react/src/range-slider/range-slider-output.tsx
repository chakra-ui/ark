import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useRangeSliderContext } from './range-slider-context'
import type { UseRangeSliderReturn } from './use-range-slider'

export type RangeSliderOutputProps = Assign<
  HTMLArkProps<'output'>,
  {
    children?: ((api: UseRangeSliderReturn) => ReactNode) | ReactNode
  }
>

export const RangeSliderOutput = forwardRef<'output', RangeSliderOutputProps>((props, ref) => {
  const { children, ...rest } = props
  const rangeSlider = useRangeSliderContext()
  const mergedProps = mergeProps(rangeSlider.outputProps, rest)

  const view = runIfFn(children, rangeSlider)

  return (
    <ark.output {...mergedProps} ref={ref}>
      {view}
    </ark.output>
  )
})
