import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerChannelSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelSliderBackgroundProps = HTMLArkProps<'div'>

export const ColorPickerChannelSliderBackground = (
  props: ColorPickerChannelSliderBackgroundProps,
) => {
  const api = useColorPickerContext()
  const colorChannelProps = useColorPickerChannelSliderContext()
  const mergedProps = mergeProps(api().getChannelSliderBackgroundProps(colorChannelProps), props)

  return <ark.div {...mergedProps} />
}
