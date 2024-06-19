import type { ChannelInputProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerChannelInputBaseProps
  extends ChannelInputProps,
    PolymorphicProps<'input'> {}
export interface ColorPickerChannelInputProps
  extends HTMLProps<'input'>,
    ColorPickerChannelInputBaseProps {}

export const ColorPickerChannelInput = (props: ColorPickerChannelInputProps) => {
  const [channelProps, inputProps] = createSplitProps<ChannelInputProps>()(props, [
    'channel',
    'orientation',
  ])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getChannelInputProps(channelProps), inputProps)

  return <ark.input {...mergedProps} />
}
