import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerLabelBaseProps extends PolymorphicProps {}
export interface DatePickerLabelProps extends HTMLProps<'label'>, DatePickerLabelBaseProps {}

export const DatePickerLabel = forwardRef<HTMLLabelElement, DatePickerLabelProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

DatePickerLabel.displayName = 'DatePickerLabel'
