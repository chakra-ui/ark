import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerChannelSliderValueTextBaseProps extends PolymorphicProps {}
export interface ColorPickerChannelSliderValueTextProps
  extends HTMLProps<'span'>,
    ColorPickerChannelSliderValueTextBaseProps {}

export const ColorPickerChannelSliderValueText = forwardRef<
  HTMLSpanElement,
  ColorPickerChannelSliderValueTextProps
>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const channelProps = useColorPickerChannelPropsContext()
  const mergedProps = mergeProps(colorPicker.getChannelSliderValueTextProps(channelProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

ColorPickerChannelSliderValueText.displayName = 'ColorPickerChannelSliderValueText'
