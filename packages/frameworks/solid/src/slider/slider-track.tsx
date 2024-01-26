import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export interface SliderTrackProps extends HTMLArkProps<'div'> {}

export const SliderTrack: ArkComponent<'div'> = (props: SliderTrackProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().trackProps, props)

  return <ark.div {...mergedProps} />
}
