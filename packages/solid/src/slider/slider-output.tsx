import { ark, HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderOutputProps = HTMLArkProps<'output'>

export const SliderOutput = (props: SliderOutputProps) => {
  const slider = useSliderContext()

  return <ark.output {...slider().outputProps} {...props} />
}
