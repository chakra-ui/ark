'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerTriggerProps extends HTMLProps<'button'>, DatePickerTriggerBaseProps {}

export const DatePickerTrigger = ({ ref, ...props }: DatePickerTriggerProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

DatePickerTrigger.displayName = 'DatePickerTrigger'
