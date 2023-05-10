import type { Assign } from '@polymorphic-factory/solid'
import type { ColorChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelInputProps = Assign<HTMLArkProps<'input'>, ColorChannelProps>

export const ColorPickerChannelInput = (props: ColorPickerChannelInputProps) => {
  const [channelProps, localProps] = createSplitProps<ColorChannelProps>()(props, [
    'channel',
    'orientation',
  ])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(api().getChannelInputProps(channelProps), localProps)

  return <ark.input {...mergedProps} />
}
