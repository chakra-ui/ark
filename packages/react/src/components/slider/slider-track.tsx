import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderTrackBaseProps extends PolymorphicProps {}
export interface SliderTrackProps extends HTMLAttributes<HTMLDivElement>, SliderTrackBaseProps {}

export const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>((props, ref) => {
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getTrackProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

SliderTrack.displayName = 'SliderTrack'
