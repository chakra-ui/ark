import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerChannelSliderContext } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerChannelSliderBackgroundProps extends HTMLArkProps<'div'> {}

export const ColorPickerChannelSliderBackground = forwardRef<
  HTMLDivElement,
  ColorPickerChannelSliderBackgroundProps
>((props, ref) => {
  const sliderContext = useColorPickerChannelSliderContext()

  const api = useColorPickerContext()
  const mergedProps = mergeProps(api.getChannelSliderBackgroundProps(sliderContext), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerChannelSliderBackground.displayName = 'ColorPickerChannelSliderBackground'
