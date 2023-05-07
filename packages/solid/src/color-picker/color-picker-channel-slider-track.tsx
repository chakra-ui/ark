import type { ColorChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { splitProps } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ColorPickerSliderProvider } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSliderTrackProps = Assign<HTMLArkProps<'div'>, ColorChannelProps>

export const ColorPickerSliderTrack = (props: ColorPickerSliderTrackProps) => {
  const [channelProps, localProps] = createSplitProps<ColorChannelProps>()(props, [
    'channel',
    'orientation',
  ])

  const colorPicker = useColorPickerContext()
  const [childrenProps, restProps] = splitProps(localProps, ['children'])

  const sliderTrackProps = mergeProps(
    () => colorPicker().getChannelSliderTrackProps(channelProps),
    restProps,
  )

  return (
    <ColorPickerSliderProvider value={channelProps}>
      <ark.div {...sliderTrackProps}>
        {childrenProps.children}
        {channelProps.channel === 'alpha' && (
          <div {...colorPicker().getChannelSliderBackgroundProps(channelProps)} />
        )}
      </ark.div>
    </ColorPickerSliderProvider>
  )
}
