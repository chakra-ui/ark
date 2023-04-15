import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerInputProps = HTMLArkProps<'input'>

export const DatePickerInput = forwardRef<'input', DatePickerInputProps>((props, ref) => {
  const { inputProps } = useDatePickerContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})
