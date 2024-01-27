import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useColorPickerChannelSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerChannelSliderThumbProps extends HTMLArkProps<'div'> {}

export const ColorPickerChannelSliderThumb: ArkComponent<'div'> = (
  props: ColorPickerChannelSliderThumbProps,
) => {
  const sliderContext = useColorPickerChannelSliderContext()
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getChannelSliderThumbProps(sliderContext), props)

  return <ark.div {...mergedProps} />
}
