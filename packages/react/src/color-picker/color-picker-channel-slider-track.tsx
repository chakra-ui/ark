import type { ColorChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { ColorPickerChannelSliderProvider } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelSliderTrackProps = Assign<HTMLArkProps<'div'>, ColorChannelProps>

export const ColorPickerChannelSliderTrack = forwardRef<'div', ColorChannelProps>((props, ref) => {
  const [channelProps, localProps] = createSplitProps<ColorChannelProps>()(props, [
    'channel',
    'orientation',
  ])
  const { getChannelSliderTrackProps } = useColorPickerContext()
  const mergedProps = mergeProps(getChannelSliderTrackProps(channelProps), localProps)

  return (
    <ColorPickerChannelSliderProvider value={channelProps}>
      <ark.div {...mergedProps} ref={ref} />
    </ColorPickerChannelSliderProvider>
  )
})
