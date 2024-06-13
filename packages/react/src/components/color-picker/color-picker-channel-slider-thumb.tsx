import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export type ColorPickerChannelSliderThumbBaseProps = {}
export interface ColorPickerChannelSliderThumbProps
  extends HTMLArkProps<'div'>,
    ColorPickerChannelSliderThumbBaseProps {}

export const ColorPickerChannelSliderThumb = forwardRef<
  HTMLDivElement,
  ColorPickerChannelSliderThumbProps
>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const channelProps = useColorPickerChannelPropsContext()
  const mergedProps = mergeProps(colorPicker.getChannelSliderThumbProps(channelProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerChannelSliderThumb.displayName = 'ColorPickerChannelSliderThumb'
