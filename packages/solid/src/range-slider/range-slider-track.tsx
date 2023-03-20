import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderTrackProps = HTMLArkProps<'div'>

export const RangeSliderTrack = (props: RangeSliderTrackProps) => {
  const slider = useRangeSliderContext()

  return <ark.div {...slider().trackProps} {...props} />
}
