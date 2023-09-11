import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderTrackProps = HtmlArkProps<'div'>

export const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>((props, ref) => {
  const { trackProps } = useSliderContext()
  const mergedProps = mergeProps(trackProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})

SliderTrack.displayName = 'SliderTrack'
