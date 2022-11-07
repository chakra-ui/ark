import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderThumbProps = HTMLArkProps<'div'>

export const RangeSliderThumb = forwardRef<'div', RangeSliderThumbProps>((props, ref) => {
  const { thumbProps } = useRangeSliderContext()
  const mergedProps = mergeProps(thumbProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
