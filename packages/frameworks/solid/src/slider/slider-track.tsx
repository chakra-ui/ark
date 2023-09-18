import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderTrackProps = HTMLArkProps<'div'>

export const SliderTrack = (props: SliderTrackProps) => {
  const slider = useSliderContext()
  const trackProps = mergeProps(() => slider().trackProps, props)
  return <ark.div {...trackProps} />
}
