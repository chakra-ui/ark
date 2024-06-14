import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'
import { useColorPickerFormatPropsContext } from './use-color-picker-format-context'

export interface ColorPickerChannelSliderThumbProps extends HTMLArkProps<'div'> {}

export const ColorPickerChannelSliderThumb = (props: ColorPickerChannelSliderThumbProps) => {
  const api = useColorPickerContext()

  const formatProps = useColorPickerFormatPropsContext()
  const channelProps = useColorPickerChannelPropsContext()
  const channelSliderProps = mergeProps(channelProps, formatProps)

  const mergedProps = mergeProps(() => api().getChannelSliderThumbProps(channelSliderProps), props)

  return <ark.div {...mergedProps} />
}
