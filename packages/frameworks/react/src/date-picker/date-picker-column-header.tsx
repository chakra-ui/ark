import { datePickerAnatomy } from '@ark-ui/anatomy'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'

export interface DatePickerColumnHeaderProps extends HTMLArkProps<'div'> {}

export const DatePickerColumnHeader = forwardRef<HTMLDivElement, DatePickerColumnHeaderProps>(
  (props, ref) => {
    return (
      <ark.div
        role="columnheader"
        {...datePickerAnatomy.build().columnHeader.attrs}
        {...props}
        ref={ref}
      />
    )
  },
)

DatePickerColumnHeader.displayName = 'DatePickerColumnHeader'
