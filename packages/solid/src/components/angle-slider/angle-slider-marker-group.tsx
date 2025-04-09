import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderMarkerGroupBaseProps extends PolymorphicProps<'div'> {}
export interface AngleSliderMarkerGroupProps extends HTMLProps<'div'>, AngleSliderMarkerGroupBaseProps {}

export const AngleSliderMarkerGroup = (props: AngleSliderMarkerGroupProps) => {
  const api = useAngleSliderContext()
  const mergedProps = mergeProps(() => api().getMarkerGroupProps(), props)

  return <ark.div {...mergedProps} />
}
