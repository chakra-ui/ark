import type { Assign } from '@polymorphic-factory/solid'
import type { ChannelInputProps } from '@zag-js/color-picker/dist/color-picker.types'
import { mergeProps } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelInputProps = Assign<HTMLArkProps<'input'>, ChannelInputProps>

export const ColorPickerChannelInput = (props: ColorPickerChannelInputProps) => {
  const [channelProps, inputProps] = createSplitProps<ChannelInputProps>()(props, [
    'channel',
    'orientation',
  ])
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker().getChannelInputProps(channelProps), inputProps)

  return <ark.input {...mergedProps} />
}
