import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderThumbProps = Assign<HTMLArkProps<'div'>, { index: number }>

export const RangeSliderThumb = forwardRef<'div', RangeSliderThumbProps>((props, ref) => {
  const { index, ...divProps } = props
  const { getThumbProps, getInputProps } = useRangeSliderContext()
  const mergedProps = mergeProps(getThumbProps(index), divProps)

  return (
    <ark.div {...mergedProps} ref={ref}>
      <ark.input {...getInputProps(index)} />
      {props.children}
    </ark.div>
  )
})
