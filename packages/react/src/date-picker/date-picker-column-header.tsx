import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { parts } from './date-picker.anatomy'

export type DatePickerColumnHeaderProps = HtmlArkProps<'div'>

export const DatePickerColumnHeader = forwardRef<HTMLDivElement, DatePickerColumnHeaderProps>(
  (props, ref) => {
    return <ark.div role="columnheader" {...parts.columnHeader.attrs} {...props} ref={ref} />
  },
)

DatePickerColumnHeader.displayName = 'DatePickerColumnHeader'
