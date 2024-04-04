import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderLabelProps extends HTMLArkProps<'label'> {}

export const SliderLabel = (props: SliderLabelProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps()} />
}
