import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderRangeProps = HTMLArkProps<'div'>

export const SliderRange = (props: SliderRangeProps) => {
  const slider = useSliderContext()
  const rangeProps = mergeProps(() => slider().rangeProps, props)
  return <ark.div {...rangeProps} />
}
