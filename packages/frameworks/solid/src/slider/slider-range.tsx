import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export interface SliderRangeProps extends HTMLArkProps<'div'> {}

export const SliderRange: ArkComponent<'div'> = (props) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().rangeProps, props)

  return <ark.div {...mergedProps} />
}
