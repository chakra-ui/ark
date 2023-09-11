import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderTrackProps = HtmlArkProps<'div'>

export const RangeSliderTrack = forwardRef<HTMLDivElement, RangeSliderTrackProps>((props, ref) => {
  const { trackProps } = useRangeSliderContext()
  const mergedProps = mergeProps(trackProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

RangeSliderTrack.displayName = 'RangeSliderTrack'
