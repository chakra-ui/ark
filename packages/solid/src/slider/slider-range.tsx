import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderRangeProps = HTMLArkProps<'div'>

export const SliderRange = (props: SliderRangeProps) => {
  const slider = useSliderContext()

  return <ark.div {...slider().rangeProps} {...props} />
}
