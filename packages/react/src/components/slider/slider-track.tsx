import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderTrackProps extends HTMLArkProps<'div'> {}

export const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>((props, ref) => {
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getTrackProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

SliderTrack.displayName = 'SliderTrack'
