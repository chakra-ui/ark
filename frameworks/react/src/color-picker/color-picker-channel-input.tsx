import type { ChannelInputProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerChannelInputProps
  extends Assign<HTMLArkProps<'input'>, ChannelInputProps> {}

export const ColorPickerChannelInput = forwardRef<HTMLInputElement, ColorPickerChannelInputProps>(
  (props, ref) => {
    const [channelProps, inputProps] = createSplitProps<ChannelInputProps>()(props, [
      'channel',
      'orientation',
    ])
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getChannelInputProps(channelProps), inputProps)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

ColorPickerChannelInput.displayName = 'ColorPickerChannelInput'
