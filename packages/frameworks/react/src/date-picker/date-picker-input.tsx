import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerInputProps extends HTMLArkProps<'input'> {}

export const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>((props, ref) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(api.getInputProps(), props)

  return <ark.input {...mergedProps} ref={ref} />
})

DatePickerInput.displayName = 'DatePickerInput'
