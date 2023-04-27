import { forwardRef } from '@polymorphic-factory/react'
import type { ChannelInputProps } from '@zag-js/color-picker/dist/color-picker.types'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelInputProps = HTMLArkProps<'input'> & ChannelInputProps

export const ColorPickerChannelInput = forwardRef<'input', ColorPickerChannelInputProps>(
  (props, ref) => {
    const [channelProps, inputProps] = createSplitProps<ChannelInputProps>()(props, [
      'channel',
      'orientation',
    ])
    const { getChannelInputProps } = useColorPickerContext()
    const mergedProps = mergeProps(getChannelInputProps(channelProps), inputProps)

    return <ark.input {...mergedProps} ref={ref} />
  },
)
