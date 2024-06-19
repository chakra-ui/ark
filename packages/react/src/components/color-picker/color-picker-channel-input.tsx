import type { ChannelInputProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerChannelInputBaseProps extends ChannelInputProps, PolymorphicProps {}
export interface ColorPickerChannelInputProps
  extends HTMLProps<'input'>,
    ColorPickerChannelInputBaseProps {}

export const ColorPickerChannelInput = forwardRef<HTMLInputElement, ColorPickerChannelInputProps>(
  (props, ref) => {
    const [channelProps, localProps] = createSplitProps<ChannelInputProps>()(props, [
      'channel',
      'orientation',
    ])
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getChannelInputProps(channelProps), localProps)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

ColorPickerChannelInput.displayName = 'ColorPickerChannelInput'
