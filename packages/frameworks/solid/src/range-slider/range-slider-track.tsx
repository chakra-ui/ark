import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderTrackProps = HTMLArkProps<'div'>

export const RangeSliderTrack = (props: RangeSliderTrackProps) => {
  const slider = useRangeSliderContext()
  const trackProps = mergeProps(() => slider().trackProps, props)
  return <ark.div {...trackProps} />
}
