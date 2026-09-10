'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import type { TriggerState } from '@zag-js/color-picker'

export interface ColorPickerTriggerState extends TriggerState {}

export interface ColorPickerTriggerBaseProps extends PolymorphicProps<ColorPickerTriggerState> {}
export interface ColorPickerTriggerProps extends HTMLProps<'button'>, ColorPickerTriggerBaseProps {}

export const ColorPickerTrigger = forwardRef<HTMLButtonElement, ColorPickerTriggerProps>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker.getTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} state={colorPicker.getTriggerState()} />
})

ColorPickerTrigger.displayName = 'ColorPickerTrigger'
