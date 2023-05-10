import type { ColorChannelInputProps } from '@zag-js/color-picker/dist/color-picker.types'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelInputProps = Assign<HTMLArkProps<'input'>, ColorChannelInputProps>

export const ColorPickerChannelInput = forwardRef<'input', ColorChannelInputProps>((props, ref) => {
  const [channelProps, inputProps] = createSplitProps<ColorChannelInputProps>()(props, [
    'channel',
    'orientation',
  ])
  const { getChannelInputProps } = useColorPickerContext()
  const mergedProps = mergeProps(getChannelInputProps(channelProps), inputProps)

  return <ark.input {...mergedProps} ref={ref} />
})
