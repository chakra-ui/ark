import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerLabelProps extends HTMLArkProps<'label'> {}

export const DatePickerLabel = forwardRef<HTMLLabelElement, DatePickerLabelProps>((props, ref) => {
  const context = useDatePickerContext()
  const mergedProps = mergeProps(context.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

DatePickerLabel.displayName = 'DatePickerLabel'
