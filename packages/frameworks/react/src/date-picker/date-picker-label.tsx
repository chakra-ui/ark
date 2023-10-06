import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'

export interface DatePickerLabelProps extends HTMLArkProps<'label'> {}

export const DatePickerLabel = forwardRef<HTMLLabelElement, DatePickerLabelProps>((props, ref) => {
  //   const api = useDatePickerContext()
  //   const mergedProps = mergeProps(api.labelProps, props)

  return <ark.label {...props} ref={ref} />
})

DatePickerLabel.displayName = 'DatePickerLabel'
