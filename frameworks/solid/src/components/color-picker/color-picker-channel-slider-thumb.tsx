import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerChannelSliderThumbProps extends HTMLArkProps<'div'> {}

export const ColorPickerChannelSliderThumb = (props: ColorPickerChannelSliderThumbProps) => {
  const api = useColorPickerContext()
  const channelProps = useColorPickerChannelPropsContext()
  const mergedProps = mergeProps(() => api().getChannelSliderThumbProps(channelProps), props)

  return <ark.div {...mergedProps} />
}
