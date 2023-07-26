import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerChannelSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelSliderThumbProps = HTMLArkProps<'div'>

export const ColorPickerChannelSliderThumb = (props: ColorPickerChannelSliderThumbProps) => {
  const api = useColorPickerContext()
  const sliderProps = useColorPickerChannelSliderContext()

  const thumbProps = mergeProps(() => api().getChannelSliderThumbProps(sliderProps), props)

  return <ark.div {...thumbProps} />
}
