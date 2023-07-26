import type { ColorChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ColorPickerChannelSliderProvider } from './color-picker-channel-slider-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelSliderTrackProps = Assign<HTMLArkProps<'div'>, ColorChannelProps>

export const ColorPickerChannelSliderTrack = (props: ColorPickerChannelSliderTrackProps) => {
  const [colorChannelProps, localProps] = createSplitProps<ColorChannelProps>()(props, [
    'channel',
    'orientation',
  ])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(
    () => api().getChannelSliderTrackProps(colorChannelProps),
    localProps,
  )

  return (
    <ColorPickerChannelSliderProvider value={colorChannelProps}>
      <ark.div {...mergedProps} />
    </ColorPickerChannelSliderProvider>
  )
}
