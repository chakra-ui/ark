import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderMarkerGroupBaseProps extends PolymorphicProps<'div'> {}
export interface SliderMarkerGroupProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    SliderMarkerGroupBaseProps {}

export const SliderMarkerGroup = (props: SliderMarkerGroupProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().getMarkerGroupProps(), props)

  return <ark.div {...mergedProps} />
}
