import type { Assign } from '@polymorphic-factory/solid'
import type { ColorChannelProps } from '@zag-js/color-picker'
import { mergeProps } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelInputProps = Assign<HTMLArkProps<'input'>, ColorChannelProps>

export const ColorPickerChannelInput = (props: ColorPickerChannelInputProps) => {
  const [channelProps, inputProps] = createSplitProps<ColorChannelProps>()(props, [
    'channel',
    'orientation',
  ])
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker().getChannelInputProps(channelProps), inputProps)

  return <ark.input {...mergedProps} />
}
