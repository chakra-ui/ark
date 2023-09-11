import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderThumbProps = HtmlArkProps<'div'>

export const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>((props, ref) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(api.thumbProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})

SliderThumb.displayName = 'SliderThumb'
