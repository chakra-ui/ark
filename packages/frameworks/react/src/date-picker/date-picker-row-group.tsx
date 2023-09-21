import { datePickerAnatomy } from '@ark-ui/anatomy'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'

export interface DatePickerRowGroupProps extends HTMLArkProps<'div'> {}

export const DatePickerRowGroup = forwardRef<HTMLDivElement, DatePickerRowGroupProps>(
  (props, ref) => (
    <ark.div role="rowgroup" {...datePickerAnatomy.build().rowGroup.attrs} {...props} ref={ref} />
  ),
)

DatePickerRowGroup.displayName = 'DatePickerRowGroup'
