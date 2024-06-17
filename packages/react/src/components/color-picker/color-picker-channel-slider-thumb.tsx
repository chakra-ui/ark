import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'
import { useColorPickerFormatPropsContext } from './use-color-picker-format-context'

export interface ColorPickerChannelSliderThumbBaseProps extends PolymorphicProps {}
export interface ColorPickerChannelSliderThumbProps
  extends HTMLAttributes<HTMLDivElement>,
    ColorPickerChannelSliderThumbBaseProps {}

export const ColorPickerChannelSliderThumb = forwardRef<
  HTMLDivElement,
  ColorPickerChannelSliderThumbProps
>((props, ref) => {
  const colorPicker = useColorPickerContext()

  const channelProps = useColorPickerChannelPropsContext()
  const formatProps = useColorPickerFormatPropsContext()
  const channelSliderProps = { ...channelProps, ...formatProps }

  const mergedProps = mergeProps(colorPicker.getChannelSliderThumbProps(channelSliderProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ColorPickerChannelSliderThumb.displayName = 'ColorPickerChannelSliderThumb'
