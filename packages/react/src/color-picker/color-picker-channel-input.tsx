import type { ColorChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelInputProps = Assign<HTMLArkProps<'input'>, ColorChannelProps>

export const ColorPickerChannelInput = forwardRef<'input', ColorChannelProps>((props, ref) => {
  const [channelProps, inputProps] = createSplitProps<ColorChannelProps>()(props, [
    'channel',
    'orientation',
  ])
  const { getChannelInputProps } = useColorPickerContext()
  const mergedProps = mergeProps(getChannelInputProps(channelProps), inputProps)

  return <ark.input {...mergedProps} ref={ref} />
})
