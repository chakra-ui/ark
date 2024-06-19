import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerChannelSliderLabelBaseProps extends PolymorphicProps {}
export interface ColorPickerChannelSliderLabelProps
  extends HTMLProps<'label'>,
    ColorPickerChannelSliderLabelBaseProps {}

export const ColorPickerChannelSliderLabel = forwardRef<
  HTMLLabelElement,
  ColorPickerChannelSliderLabelProps
>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const channelProps = useColorPickerChannelPropsContext()
  const mergedProps = mergeProps(colorPicker.getChannelSliderLabelProps(channelProps), props)

  return <ark.label {...mergedProps} ref={ref} />
})

ColorPickerChannelSliderLabel.displayName = 'ColorPickerChannelSliderLabel'
