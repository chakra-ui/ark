import type { ColorChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createMemo, splitProps } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ColorPickerSliderProvider } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSliderTrackProps = Assign<HTMLArkProps<'div'>, ColorChannelProps>

export const ColorPickerSliderTrack = (props: ColorPickerSliderTrackProps) => {
  const [channelProps, divProps] = createSplitProps<ColorChannelProps>()(props, [
    'channel',
    'orientation',
  ])
  const colorPicker = useColorPickerContext()
  const [childrenProps, restProps] = splitProps(divProps, ['children'])

  const mergedProps = createMemo(() =>
    mergeProps(colorPicker().getChannelSliderTrackProps(channelProps), restProps),
  )

  return (
    <ColorPickerSliderProvider value={channelProps}>
      <ark.div {...mergedProps()}>
        {childrenProps.children}
        {channelProps.channel === 'alpha' && (
          <div {...colorPicker().getChannelSliderBackgroundProps(channelProps)} />
        )}
      </ark.div>
    </ColorPickerSliderProvider>
  )
}
