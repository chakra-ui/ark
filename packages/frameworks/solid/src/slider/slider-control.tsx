import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderControlProps = HTMLArkProps<'div'>

export const SliderControl = (props: SliderControlProps) => {
  const api = useSliderContext()
  const controlProps = mergeProps(() => api().controlProps, props)
  return <ark.div {...controlProps} />
}
