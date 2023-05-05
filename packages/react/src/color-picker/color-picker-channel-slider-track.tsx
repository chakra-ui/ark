import type { ColorChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { ColorPickerSliderProvider } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSliderTrackProps = Assign<HTMLArkProps<'div'>, ColorChannelProps>

export const ColorPickerSliderTrack = forwardRef<'div', ColorChannelProps>((props, ref) => {
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
})
