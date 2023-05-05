import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderTrackProps = HTMLArkProps<'div'>

export const RangeSliderTrack = forwardRef<'div', RangeSliderTrackProps>((props, ref) => {
  const { trackProps } = useRangeSliderContext()
  const mergedProps = mergeProps(trackProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
