import type { ColorChannelInputProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerChannelInputProps
  extends Assign<ColorChannelInputProps, HTMLArkProps<'input'>> {}

export const ColorPickerChannelInput = forwardRef<HTMLInputElement, ColorPickerChannelInputProps>(
  (props, ref) => {
    const [channelProps, inputProps] = createSplitProps<ColorChannelInputProps>()(props, [
      'channel',
      'orientation',
    ])
    const api = useColorPickerContext()
    const mergedProps = mergeProps(api.getChannelInputProps(channelProps), inputProps)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

ColorPickerChannelInput.displayName = 'ColorPickerChannelInput'
