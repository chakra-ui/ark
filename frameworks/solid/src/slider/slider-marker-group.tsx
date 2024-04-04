import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderMarkerGroupProps extends HTMLArkProps<'div'> {}

export const SliderMarkerGroup = (props: SliderMarkerGroupProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().markerGroupProps, props)

  return <ark.div {...mergedProps()} />
}
