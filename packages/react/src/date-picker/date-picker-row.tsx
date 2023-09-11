import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { parts } from './date-picker.anatomy'

export type DatePickerRowProps = HTMLArkProps<'div'>

export const DatePickerRow = forwardRef<HTMLDivElement, DatePickerRowProps>((props, ref) => (
  <ark.div role="row" {...parts.row.attrs} {...props} ref={ref} />
))

DatePickerRow.displayName = 'DatePickerRow'
