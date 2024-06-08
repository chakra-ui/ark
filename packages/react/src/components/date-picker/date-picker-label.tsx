import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerLabelProps extends HTMLArkProps<'label'> {}

export const DatePickerLabel = forwardRef<HTMLLabelElement, DatePickerLabelProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

DatePickerLabel.displayName = 'DatePickerLabel'
