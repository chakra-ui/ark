import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { parts } from './date-picker.anatomy'

export type DatePickerRowGroupProps = HtmlArkProps<'div'>

export const DatePickerRowGroup = forwardRef<HTMLDivElement, DatePickerRowGroupProps>(
  (props, ref) => <ark.div role="rowgroup" {...parts.rowGroup.attrs} {...props} ref={ref} />,
)

DatePickerRowGroup.displayName = 'DatePickerRowGroup'
