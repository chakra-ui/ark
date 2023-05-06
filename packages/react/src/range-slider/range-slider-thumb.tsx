import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { type Assign } from '../types'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderThumbProps = Assign<HTMLArkProps<'div'>, { index: number }>

export const RangeSliderThumb = forwardRef<'div', RangeSliderThumbProps>((props, ref) => {
  const { index, ...divProps } = props
  const { getThumbProps, getHiddenInputProps } = useRangeSliderContext()
  const mergedProps = mergeProps(getThumbProps(index), divProps)

  return (
    <ark.div {...mergedProps} ref={ref}>
      <ark.input {...getHiddenInputProps(index)} />
      {props.children}
    </ark.div>
  )
})
