import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderOutputProps = Assign<
  HTMLArkProps<'output'>,
  {
    children: ReactNode | (({ value }: { value: number[] }) => ReactNode)
  }
>

export const RangeSliderOutput = forwardRef<'output', RangeSliderOutputProps>((props, ref) => {
  const { children, ...rest } = props
  const { outputProps, value } = useRangeSliderContext()
  const mergedProps = mergeProps(outputProps, rest)

  const view = runIfFn(children, { value: value })

  return (
    <ark.output {...mergedProps} ref={ref}>
      {view}
    </ark.output>
  )
})
