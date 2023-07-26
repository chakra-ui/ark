import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderThumbProps = HTMLArkProps<'div'>

export const SliderThumb = (props: SliderThumbProps) => {
  const api = useSliderContext()
  const thumbProps = mergeProps(() => api().thumbProps, props)

  return (
    <ark.div {...thumbProps}>
      <ark.input {...api().hiddenInputProps} />
      {props.children}
    </ark.div>
  )
}
