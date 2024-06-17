import type { InputProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { type InputHTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerInputBaseProps extends InputProps, PolymorphicProps {}
export interface DatePickerInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    DatePickerInputBaseProps {}

export const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>((props, ref) => {
  const [inputProps, localProps] = createSplitProps<InputProps>()(props, ['index'])
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getInputProps(inputProps), localProps)

  return <ark.input {...mergedProps} ref={ref} />
})

DatePickerInput.displayName = 'DatePickerInput'
