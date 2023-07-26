import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSliderContext } from './slider-context'

export type SliderRangeProps = HTMLArkProps<'div'>

export const SliderRange = forwardRef<'div'>((props, ref) => {
  const { rangeProps } = useSliderContext()
  const mergedProps = mergeProps(rangeProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})
