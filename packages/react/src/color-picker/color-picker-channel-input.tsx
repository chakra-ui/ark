import { forwardRef } from '@polymorphic-factory/react'
import type { ColorChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelInputProps = HTMLArkProps<'input'> & ColorChannelProps

export const ColorPickerChannelInput = forwardRef<'input', ColorPickerChannelInputProps>(
  (props, ref) => {
    const [channelProps, inputProps] = createSplitProps<ColorChannelProps>()(props, [
      'channel',
      'orientation',
    ])
    const { getChannelInputProps } = useColorPickerContext()
    const mergedProps = mergeProps(getChannelInputProps(channelProps), inputProps)

    return <ark.input {...mergedProps} ref={ref} />
  },
)
