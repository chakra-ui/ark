import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useLocaleContext } from '../../providers'
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
  const { locale } = useLocaleContext()
  const colorPicker = useColorPickerContext()
  const channelProps = useColorPickerChannelPropsContext()
  const mergedProps = mergeProps(colorPicker.getChannelSliderValueTextProps(channelProps), props)

  return (
    <ark.span {...mergedProps} ref={ref}>
      {props.children || colorPicker.getChannelValueText(channelProps.channel, locale)}
    </ark.span>
  )
})

ColorPickerChannelSliderValueText.displayName = 'ColorPickerChannelSliderValueText'
