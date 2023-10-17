import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderRangeProps = HTMLArkProps<'div'>

export const SliderRange = (props: SliderRangeProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().rangeProps, props)

  return <ark.div {...mergedProps} />
}
