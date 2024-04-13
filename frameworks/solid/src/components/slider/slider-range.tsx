import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import { useSliderContext } from './use-slider-context'

export interface SliderRangeProps extends HTMLArkProps<'div'> {}

export const SliderRange = (props: SliderRangeProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().rangeProps, props)

  return <ark.div {...mergedProps} />
}
