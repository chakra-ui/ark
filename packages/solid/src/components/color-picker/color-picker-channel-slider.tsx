import type { ChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { ColorPickerChannelPropsProvider } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'
import { useColorPickerFormatPropsContext } from './use-color-picker-format-context'

export interface ColorPickerChannelSliderBaseProps extends ChannelProps, PolymorphicProps<'div'> {}
export interface ColorPickerChannelSliderProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ColorPickerChannelSliderBaseProps {}

export const ColorPickerChannelSlider = (props: ColorPickerChannelSliderProps) => {
  const [channelProps, localProps] = createSplitProps<ChannelProps>()(props, [
    'channel',
    'orientation',
  ])

  const api = useColorPickerContext()

  const formatProps = useColorPickerFormatPropsContext()
  const channelSliderProps = mergeProps(channelProps, formatProps)

  const mergedProps = mergeProps(() => api().getChannelSliderProps(channelSliderProps), localProps)

  return (
    <ColorPickerChannelPropsProvider value={channelProps}>
      <ark.div {...mergedProps} />
    </ColorPickerChannelPropsProvider>
  )
}
