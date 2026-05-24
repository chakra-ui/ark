'use client'

import type { ChannelProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { ColorPickerChannelPropsProvider } from './use-color-picker-channel-props-context.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useColorPickerFormatPropsContext } from './use-color-picker-format-context.ts'

export interface ColorPickerChannelSliderBaseProps extends ChannelProps, PolymorphicProps {}
export interface ColorPickerChannelSliderProps extends HTMLProps<'div'>, ColorPickerChannelSliderBaseProps {}

const splitChannelProps = createSplitProps<ChannelProps>()

export const ColorPickerChannelSlider = forwardRef<HTMLDivElement, ColorPickerChannelSliderProps>((props, ref) => {
  const [channelProps, localProps] = splitChannelProps(props, ['channel', 'orientation'])

  const colorPicker = useColorPickerContext()

  const formatProps = useColorPickerFormatPropsContext()
  const channelSliderProps = { ...channelProps, ...formatProps }

  const mergedProps = mergeProps(colorPicker.getChannelSliderProps(channelSliderProps), localProps)

  return (
    <ColorPickerChannelPropsProvider value={channelProps}>
      <ark.div {...mergedProps} ref={ref} />
    </ColorPickerChannelPropsProvider>
  )
})

ColorPickerChannelSlider.displayName = 'ColorPickerChannelSlider'
