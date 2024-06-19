import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderTrackBaseProps extends PolymorphicProps<'div'> {}
export interface SliderTrackProps extends HTMLProps<'div'>, SliderTrackBaseProps {}

export const SliderTrack = (props: SliderTrackProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().getTrackProps(), props)

  return <ark.div {...mergedProps} />
}
