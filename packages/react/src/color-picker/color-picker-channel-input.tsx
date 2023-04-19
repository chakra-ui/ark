import { forwardRef } from '@polymorphic-factory/react'
import type { ChannelInputProps } from '@zag-js/color-picker/dist/color-picker.types'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerChannelInputProps = HTMLArkProps<'input'> & ChannelInputProps

export const ColorPickerChannelInput = forwardRef<'input', ColorPickerChannelInputProps>(
  (props, ref) => {
    const { channel, orientation, ...rest } = props
    const { getChannelInputProps } = useColorPickerContext()
    const mergedProps = mergeProps(getChannelInputProps({ channel, orientation }), rest)

    return <ark.input {...mergedProps} ref={ref} />
  },
)
