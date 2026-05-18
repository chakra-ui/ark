'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context.ts'

export interface DatePickerViewTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerViewTriggerProps extends HTMLProps<'button'>, DatePickerViewTriggerBaseProps {}

export const DatePickerViewTrigger = forwardRef<HTMLButtonElement, DatePickerViewTriggerProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()
  const mergedProps = mergeProps(datePicker.getViewTriggerProps(viewProps), props)

  return <ark.button {...mergedProps} ref={ref} />
})

DatePickerViewTrigger.displayName = 'DatePickerViewTrigger'
