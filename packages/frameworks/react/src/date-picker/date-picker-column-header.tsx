import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { parts } from './date-picker.anatomy'

export type DatePickerColumnHeaderProps = HTMLArkProps<'div'>

export const DatePickerColumnHeader = forwardRef<HTMLDivElement, DatePickerColumnHeaderProps>(
  (props, ref) => {
    return <ark.div role="columnheader" {...parts.columnHeader.attrs} {...props} ref={ref} />
  },
)

DatePickerColumnHeader.displayName = 'DatePickerColumnHeader'
