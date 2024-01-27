import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useColorPickerChannelSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerChannelSliderTrackProps extends HTMLArkProps<'div'> {}

export const ColorPickerChannelSliderTrack: ArkComponent<'div'> = (
  props: ColorPickerChannelSliderTrackProps,
) => {
  const sliderContext = useColorPickerChannelSliderContext()
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getChannelSliderTrackProps(sliderContext), props)

  return <ark.div {...mergedProps} />
}
