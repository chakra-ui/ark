import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderMarkerGroupProps = HTMLArkProps<'div'>

export const SliderMarkerGroup = (props: SliderMarkerGroupProps) => {
  const slider = useSliderContext()

  return <ark.div {...slider().markerGroupProps} {...props} />
}
