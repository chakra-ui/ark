import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export interface SliderMarkerGroupProps extends HTMLArkProps<'div'> {}

export const SliderMarkerGroup: ArkComponent<'div'> = (props: SliderMarkerGroupProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().markerGroupProps, props)

  return <ark.div {...mergedProps} />
}
