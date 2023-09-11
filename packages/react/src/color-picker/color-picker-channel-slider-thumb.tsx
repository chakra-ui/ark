import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useColorPickerChannelSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelSliderThumbProps = HtmlArkProps<'div'>

export const ColorPickerChannelSliderThumb = forwardRef<
  HTMLDivElement,
  ColorPickerChannelSliderThumbProps
>((props, ref) => {
  const sliderContext = useColorPickerChannelSliderContext()
  const { getChannelSliderThumbProps } = useColorPickerContext()
  const mergedProps = mergeProps(getChannelSliderThumbProps(sliderContext), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerChannelSliderThumb.displayName = 'ColorPickerChannelSliderThumb'
