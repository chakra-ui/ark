import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderTrackProps = HTMLArkProps<'div'>

export const SliderTrack = (props: SliderTrackProps) => {
  const slider = useSliderContext()

  return <ark.div {...slider().trackProps} {...props} />
}
