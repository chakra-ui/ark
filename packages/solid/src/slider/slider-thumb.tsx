import { ark, HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderThumbProps = HTMLArkProps<'div'>

export const SliderThumb = (props: SliderThumbProps) => {
  const slider = useSliderContext()

  return (
    <ark.div {...slider().thumbProps} {...props}>
      <ark.input {...slider().hiddenInputProps} />
      {props.children}
    </ark.div>
  )
}
