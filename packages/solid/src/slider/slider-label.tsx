import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderLabelProps = HTMLArkProps<'label'>

export const SliderLabel = (props: SliderLabelProps) => {
  const slider = useSliderContext()

  return <ark.label {...slider().labelProps} {...props} />
}
