import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderValueTextProps extends HTMLArkProps<'span'> {}

export const SliderValueText = (props: SliderValueTextProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().valueTextProps, props)

  return <ark.span {...mergedProps}>{props.children || api().value.join(',')}</ark.span>
}
