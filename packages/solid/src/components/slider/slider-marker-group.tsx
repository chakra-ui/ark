import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderMarkerGroupProps extends HTMLArkProps<'div'> {}

export const SliderMarkerGroup = (props: SliderMarkerGroupProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().getMarkerGroupProps(), props)

  return <ark.div {...mergedProps} />
}
