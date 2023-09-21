import type { ColorChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ColorPickerChannelSliderProvider } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerChannelSliderTrackProps
  extends Assign<HTMLArkProps<'div'>, ColorChannelProps> {}

export const ColorPickerChannelSliderTrack = forwardRef<
  HTMLDivElement,
  ColorPickerChannelSliderTrackProps
>((props, ref) => {
  const [channelProps, localProps] = createSplitProps<ColorChannelProps>()(props, [
    'channel',
    'orientation',
  ])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(api.getChannelSliderTrackProps(channelProps), localProps)

  return (
    <ColorPickerChannelSliderProvider value={channelProps}>
      <ark.div {...mergedProps} ref={ref} />
    </ColorPickerChannelSliderProvider>
  )
})

ColorPickerChannelSliderTrack.displayName = 'ColorPickerChannelSliderTrack'
