import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderControlProps = HTMLArkProps<'div'>

export const SliderControl = (props: SliderControlProps) => {
  const slider = useSliderContext()

  return <ark.div {...slider().controlProps} {...props} />
}
