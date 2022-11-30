import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderInputProps = HTMLArkProps<'input'>

export const SliderInput = (props: SliderInputProps) => {
  const slider = useSliderContext()

  return <ark.input {...slider().inputProps} {...props} />
}
