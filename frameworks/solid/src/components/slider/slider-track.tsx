import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderTrackProps extends HTMLArkProps<'div'> {}

export const SliderTrack = (props: SliderTrackProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().trackProps, props)

  return <ark.div {...mergedProps} />
}
