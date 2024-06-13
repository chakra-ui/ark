import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export type SliderTrackBaseProps = {}
export interface SliderTrackProps extends HTMLArkProps<'div'>, SliderTrackBaseProps {}

export const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>((props, ref) => {
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getTrackProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

SliderTrack.displayName = 'SliderTrack'
