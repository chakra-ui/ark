import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

// TODO: remove after zag is updated
interface InputProps {
  index?: number
}

export interface DatePickerInputProps extends Assign<HTMLArkProps<'input'>, InputProps> {}

export const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>((props, ref) => {
  const [inputProps, localProps] = createSplitProps<InputProps>()(props, ['index'])
  const api = useDatePickerContext()
  const mergedProps = mergeProps(api.getInputProps(inputProps), localProps)

  return <ark.input {...mergedProps} ref={ref} />
})

DatePickerInput.displayName = 'DatePickerInput'
