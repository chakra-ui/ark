'use client'

import type { ChannelInputProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerChannelInputBaseProps extends ChannelInputProps, PolymorphicProps {}
export interface ColorPickerChannelInputProps extends HTMLProps<'input'>, ColorPickerChannelInputBaseProps {}

const splitChannelInputProps = createSplitProps<ChannelInputProps>()

export const ColorPickerChannelInput = forwardRef<HTMLInputElement, ColorPickerChannelInputProps>((props, ref) => {
  const [channelProps, localProps] = splitChannelInputProps(props, ['channel', 'orientation'])
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker.getChannelInputProps(channelProps), localProps)

  return <ark.input {...mergedProps} ref={ref} />
})

ColorPickerChannelInput.displayName = 'ColorPickerChannelInput'
