import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderControlProps extends HTMLArkProps<'div'> {}

export const SliderControl = (props: SliderControlProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return <ark.div {...mergedProps} />
}
