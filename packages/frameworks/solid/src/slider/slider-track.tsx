import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderTrackProps = HTMLArkProps<'div'>

export const SliderTrack = (props: SliderTrackProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().trackProps, props)

  return <ark.div {...mergedProps} />
}
