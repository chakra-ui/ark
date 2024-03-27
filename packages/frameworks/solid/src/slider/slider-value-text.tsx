import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderValueTextProps extends HTMLArkProps<'div'> {}

export const SliderValueText = (props: SliderValueTextProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().valueTextProps, props)

  return <ark.div {...mergedProps}>{props.children || api().value.join(',')}</ark.div>
}
