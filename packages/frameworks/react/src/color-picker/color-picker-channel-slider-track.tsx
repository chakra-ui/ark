import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerChannelSliderContext } from './use-color-picker-channel-slider-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerChannelSliderTrackProps extends HTMLArkProps<'div'> {}

export const ColorPickerChannelSliderTrack = forwardRef<
  HTMLDivElement,
  ColorPickerChannelSliderTrackProps
>((props, ref) => {
  const context = useColorPickerContext()
  const sliderContext = useColorPickerChannelSliderContext()
  const mergedProps = mergeProps(context.getChannelSliderTrackProps(sliderContext), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerChannelSliderTrack.displayName = 'ColorPickerChannelSliderTrack'
