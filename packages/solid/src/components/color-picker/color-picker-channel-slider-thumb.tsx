import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'
import { useColorPickerFormatPropsContext } from './use-color-picker-format-context'

export interface ColorPickerChannelSliderThumbBaseProps extends PolymorphicProps<'div'> {}
export interface ColorPickerChannelSliderThumbProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ColorPickerChannelSliderThumbBaseProps {}

export const ColorPickerChannelSliderThumb = (props: ColorPickerChannelSliderThumbProps) => {
  const api = useColorPickerContext()

  const formatProps = useColorPickerFormatPropsContext()
  const channelProps = useColorPickerChannelPropsContext()
  const channelSliderProps = mergeProps(channelProps, formatProps)

  const mergedProps = mergeProps(() => api().getChannelSliderThumbProps(channelSliderProps), props)

  return <ark.div {...mergedProps} />
}
