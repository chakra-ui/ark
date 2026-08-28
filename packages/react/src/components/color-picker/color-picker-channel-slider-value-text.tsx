'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useLocaleContext } from '../../providers/index.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerChannelSliderValueTextBaseProps extends PolymorphicProps {}
export interface ColorPickerChannelSliderValueTextProps
  extends HTMLProps<'span'>, ColorPickerChannelSliderValueTextBaseProps {}

export const ColorPickerChannelSliderValueText = forwardRef<HTMLSpanElement, ColorPickerChannelSliderValueTextProps>(
  (props, ref) => {
    const { locale } = useLocaleContext()
    const colorPicker = useColorPickerContext()
    const channelProps = useColorPickerChannelPropsContext()
    const mergedProps = mergeProps(colorPicker.getChannelSliderValueTextProps(channelProps), props)

    return (
      <ark.span {...mergedProps} ref={ref}>
        {props.children || colorPicker.getChannelValueText(channelProps.channel, locale)}
      </ark.span>
    )
  },
)

ColorPickerChannelSliderValueText.displayName = 'ColorPickerChannelSliderValueText'
