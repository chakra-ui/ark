import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderTrackProps = ComponentPropsWithoutRef<typeof ark.div>

export const RangeSliderTrack = forwardRef<HTMLDivElement, RangeSliderTrackProps>((props, ref) => {
  const { trackProps } = useRangeSliderContext()
  const mergedProps = mergeProps(trackProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

RangeSliderTrack.displayName = 'RangeSliderTrack'
