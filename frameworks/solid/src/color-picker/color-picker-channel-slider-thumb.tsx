import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerChannelSliderContext } from './use-color-picker-channel-slider-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerChannelSliderThumbProps extends HTMLArkProps<'div'> {}

export const ColorPickerChannelSliderThumb = (props: ColorPickerChannelSliderThumbProps) => {
  const sliderContext = useColorPickerChannelSliderContext()
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getChannelSliderThumbProps(sliderContext), props)

  return <ark.div {...mergedProps()} />
}
