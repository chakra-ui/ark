import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderThumbProps = HTMLArkProps<'div'> & { index: number }

export const RangeSliderThumb = forwardRef<'div', RangeSliderThumbProps>((props, ref) => {
  const { index, ...divProps } = props
  const { getThumbProps } = useRangeSliderContext()
  const mergedProps = mergeProps(getThumbProps(index), divProps)

  return <ark.div {...mergedProps} ref={ref} />
})
