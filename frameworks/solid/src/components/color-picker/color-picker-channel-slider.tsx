import type { ChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { ColorPickerChannelSliderProvider } from './use-color-picker-channel-slider-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerChannelSliderProps extends Assign<HTMLArkProps<'div'>, ChannelProps> {}

export const ColorPickerChannelSlider = (props: ColorPickerChannelSliderProps) => {
  const [channelProps, localProps] = createSplitProps<ChannelProps>()(props, [
    'channel',
    'orientation',
  ])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getChannelSliderProps(channelProps), localProps)

  return (
    <ColorPickerChannelSliderProvider value={channelProps}>
      <ark.div {...mergedProps} />
    </ColorPickerChannelSliderProvider>
  )
}
