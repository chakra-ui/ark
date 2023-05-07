import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSliderThumbProps = HTMLArkProps<'div'>

export const ColorPickerSliderThumb = (props: ColorPickerSliderThumbProps) => {
  const colorPicker = useColorPickerContext()
  const sliderProps = useColorPickerSliderContext()

  const thumbProps = mergeProps(() => colorPicker().getChannelSliderThumbProps(sliderProps), props)

  return <ark.div {...thumbProps} />
}
