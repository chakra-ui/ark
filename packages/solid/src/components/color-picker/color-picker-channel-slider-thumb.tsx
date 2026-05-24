import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useColorPickerFormatPropsContext } from './use-color-picker-format-context.ts'

export interface ColorPickerChannelSliderThumbBaseProps extends PolymorphicProps<'div'> {}
export interface ColorPickerChannelSliderThumbProps extends HTMLProps<'div'>, ColorPickerChannelSliderThumbBaseProps {}

export const ColorPickerChannelSliderThumb = (props: ColorPickerChannelSliderThumbProps) => {
  const api = useColorPickerContext()

  const formatProps = useColorPickerFormatPropsContext()
  const channelProps = useColorPickerChannelPropsContext()
  const channelSliderProps = mergeProps(channelProps, formatProps)

  const mergedProps = mergeProps(() => api().getChannelSliderThumbProps(channelSliderProps), props)

  return <ark.div {...mergedProps} />
}
