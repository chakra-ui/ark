import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerChannelSliderTrackProps extends HTMLArkProps<'div'> {}

export const ColorPickerChannelSliderTrack = forwardRef<
  HTMLDivElement,
  ColorPickerChannelSliderTrackProps
>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const channelProps = useColorPickerChannelPropsContext()
  const mergedProps = mergeProps(colorPicker.getChannelSliderTrackProps(channelProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerChannelSliderTrack.displayName = 'ColorPickerChannelSliderTrack'
