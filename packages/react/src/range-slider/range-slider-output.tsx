import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderOutputProps = HTMLArkProps<'output'>

export const RangeSliderOutput = forwardRef<'output', RangeSliderOutputProps>((props, ref) => {
  const { outputProps } = useRangeSliderContext()
  const mergedProps = mergeProps(outputProps, props)

  return <ark.output {...mergedProps} ref={ref} />
})
