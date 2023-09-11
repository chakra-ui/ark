import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerInputProps = HtmlArkProps<'input'>

export const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>((props, ref) => {
  const { inputProps } = useDatePickerContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})

DatePickerInput.displayName = 'DatePickerInput'
