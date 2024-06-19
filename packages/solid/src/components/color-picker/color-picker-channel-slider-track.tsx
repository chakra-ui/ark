import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'
import { useColorPickerFormatPropsContext } from './use-color-picker-format-context'

export interface ColorPickerChannelSliderTrackBaseProps extends PolymorphicProps<'div'> {}
export interface ColorPickerChannelSliderTrackProps
  extends HTMLProps<'div'>,
    ColorPickerChannelSliderTrackBaseProps {}

export const ColorPickerChannelSliderTrack = (props: ColorPickerChannelSliderTrackProps) => {
  const api = useColorPickerContext()

  const formatProps = useColorPickerFormatPropsContext()
  const channelProps = useColorPickerChannelPropsContext()
  const channelSliderProps = mergeProps(channelProps, formatProps)

  const mergedProps = mergeProps(() => api().getChannelSliderTrackProps(channelSliderProps), props)

  return <ark.div {...mergedProps} />
}
