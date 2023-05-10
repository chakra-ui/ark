import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerChannelSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelSliderThumbProps = HTMLArkProps<'div'>

export const ColorPickerChannelSliderThumb = (props: ColorPickerChannelSliderThumbProps) => {
  const api = useColorPickerContext()
  const colorChannelProps = useColorPickerChannelSliderContext()
  const mergedProps = mergeProps(api().getChannelSliderThumbProps(colorChannelProps), props)

  return <ark.div {...mergedProps} />
}
