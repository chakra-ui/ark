import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { parts } from './date-picker.anatomy'

export type DatePickerRowProps = ComponentPropsWithoutRef<typeof ark.div>

export const DatePickerRow = forwardRef<HTMLDivElement, DatePickerRowProps>((props, ref) => (
  <ark.div role="row" {...parts.row.attrs} {...props} ref={ref} />
))

DatePickerRow.displayName = 'DatePickerRow'
