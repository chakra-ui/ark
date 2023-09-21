import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export interface RangeSliderTrackProps extends HTMLArkProps<'div'> {}

export const RangeSliderTrack = forwardRef<HTMLDivElement, RangeSliderTrackProps>((props, ref) => {
  const api = useRangeSliderContext()
  const mergedProps = mergeProps(api.trackProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

RangeSliderTrack.displayName = 'RangeSliderTrack'
