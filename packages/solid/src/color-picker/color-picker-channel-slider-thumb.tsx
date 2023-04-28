import { mergeProps } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSliderThumbProps = HTMLArkProps<'div'>

export const ColorPickerSliderThumb = (props: ColorPickerSliderThumbProps) => {
  const colorPicker = useColorPickerContext()
  const slider = useColorPickerSliderContext()
  const mergedProps = mergeProps(colorPicker().getChannelSliderThumbProps(slider), props)

  return <ark.div {...mergedProps} />
}
