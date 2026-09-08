'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import type { TriggerState } from '@zag-js/date-picker'

export interface DatePickerTriggerState extends TriggerState {}

export interface DatePickerTriggerBaseProps extends PolymorphicProps<DatePickerTriggerState> {}
export interface DatePickerTriggerProps extends HTMLProps<'button'>, DatePickerTriggerBaseProps {}

export const DatePickerTrigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} state={datePicker.getTriggerState()} />
})

DatePickerTrigger.displayName = 'DatePickerTrigger'
