import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { parts } from './date-picker.anatomy'

export type DatePickerRowProps = HtmlArkProps<'div'>

export const DatePickerRow = forwardRef<HTMLDivElement, DatePickerRowProps>((props, ref) => (
  <ark.div role="row" {...parts.row.attrs} {...props} ref={ref} />
))

DatePickerRow.displayName = 'DatePickerRow'
