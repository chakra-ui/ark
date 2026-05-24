'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context.ts'

export interface DatePickerViewControlBaseProps extends PolymorphicProps {}
export interface DatePickerViewControlProps extends HTMLProps<'div'>, DatePickerViewControlBaseProps {}

export const DatePickerViewControl = forwardRef<HTMLDivElement, DatePickerViewControlProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()
  const mergedProps = mergeProps(datePicker.getViewControlProps(viewProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

DatePickerViewControl.displayName = 'DatePickerViewControl'
