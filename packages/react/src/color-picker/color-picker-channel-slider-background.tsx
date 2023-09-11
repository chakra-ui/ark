import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useColorPickerChannelSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelSliderBackgroundProps = HtmlArkProps<'div'>

export const ColorPickerChannelSliderBackground = forwardRef<
  HTMLDivElement,
  ColorPickerChannelSliderBackgroundProps
>((props, ref) => {
  const sliderContext = useColorPickerChannelSliderContext()
  const { getChannelSliderBackgroundProps } = useColorPickerContext()
  const mergedProps = mergeProps(getChannelSliderBackgroundProps(sliderContext), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerChannelSliderBackground.displayName = 'ColorPickerChannelSliderBackground'
