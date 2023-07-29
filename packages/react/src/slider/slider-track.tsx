import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderTrackProps = ComponentPropsWithoutRef<typeof ark.div>

export const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>((props, ref) => {
  const { trackProps } = useSliderContext()
  const mergedProps = mergeProps(trackProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})

SliderTrack.displayName = 'SliderTrack'
