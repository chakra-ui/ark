import type { ColorChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelInputProps = Assign<HTMLArkProps<'input'>, ColorChannelProps>

export const ColorPickerChannelInput = (props: ColorPickerChannelInputProps) => {
  const [channelProps, restProps] = createSplitProps<ColorChannelProps>()(props, [
    'channel',
    'orientation',
  ])

  const colorPicker = useColorPickerContext()
  const channelInputProps = mergeProps(
    () => colorPicker().getChannelInputProps(channelProps),
    restProps,
  )

  return <ark.input {...channelInputProps} />
}
