import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderThumbProps = HTMLArkProps<'div'>

export const SliderThumb = (props: SliderThumbProps) => {
  const api = useSliderContext()
  const mergePdrops = mergeProps(() => api().thumbProps, props)

  return <ark.div {...mergePdrops} />
}
