import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { parts } from './date-picker.anatomy'

export type DatePickerColumnHeaderProps = ComponentPropsWithoutRef<typeof ark.div>

export const DatePickerColumnHeader = forwardRef<HTMLDivElement, DatePickerColumnHeaderProps>(
  (props, ref) => {
    return <ark.div role="columnheader" {...parts.columnHeader.attrs} {...props} ref={ref} />
  },
)

DatePickerColumnHeader.displayName = 'DatePickerColumnHeader'
