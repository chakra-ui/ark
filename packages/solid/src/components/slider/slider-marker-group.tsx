import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderMarkerGroupBaseProps extends PolymorphicProps<'div'> {}
export interface SliderMarkerGroupProps extends HTMLProps<'div'>, SliderMarkerGroupBaseProps {}

export const SliderMarkerGroup = (props: SliderMarkerGroupProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().getMarkerGroupProps(), props)

  return <ark.div {...mergedProps} />
}
