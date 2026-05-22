'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerClearTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerClearTriggerProps extends HTMLProps<'button'>, DatePickerClearTriggerBaseProps {}

export const DatePickerClearTrigger = ({ ref, ...props }: DatePickerClearTriggerProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getClearTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

DatePickerClearTrigger.displayName = 'DatePickerClearTrigger'
