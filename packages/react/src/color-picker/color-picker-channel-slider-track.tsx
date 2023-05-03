import { forwardRef } from '@polymorphic-factory/react'
import type { ColorChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { ColorPickerSliderProvider } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSliderTrackProps = HTMLArkProps<'div'> & ColorChannelProps

export const ColorPickerSliderTrack = forwardRef<'div', ColorPickerSliderTrackProps>(
  (props, ref) => {
    const [channelProps, { children, ...divProps }] = createSplitProps<ColorChannelProps>()(props, [
      'channel',
      'orientation',
    ])
    const { getChannelSliderTrackProps, getChannelSliderBackgroundProps } = useColorPickerContext()
    const mergedProps = mergeProps(getChannelSliderTrackProps(channelProps), divProps)

    return (
      <ColorPickerSliderProvider value={channelProps}>
        <ark.div {...mergedProps} ref={ref}>
          <ark.div {...getChannelSliderBackgroundProps(channelProps)} />
          {children}
        </ark.div>
      </ColorPickerSliderProvider>
    )
  },
)
