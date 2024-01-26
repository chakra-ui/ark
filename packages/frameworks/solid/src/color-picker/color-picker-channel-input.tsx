import type { ChannelInputProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerChannelInputProps
  extends Assign<HTMLArkProps<'input'>, ChannelInputProps> {}

export const ColorPickerChannelInput: ArkComponent<'input', ChannelInputProps> = (
  props: ColorPickerChannelInputProps,
) => {
  const [channelProps, inputProps] = createSplitProps<ChannelInputProps>()(props, [
    'channel',
    'orientation',
  ])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getChannelInputProps(channelProps), inputProps)

  return <ark.input {...mergedProps} />
}
