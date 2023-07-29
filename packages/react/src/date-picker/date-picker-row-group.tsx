import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { parts } from './date-picker.anatomy'

export type DatePickerRowGroupProps = ComponentPropsWithoutRef<typeof ark.div>

export const DatePickerRowGroup = forwardRef<HTMLDivElement, DatePickerRowGroupProps>(
  (props, ref) => <ark.div role="rowgroup" {...parts.rowGroup.attrs} {...props} ref={ref} />,
)

DatePickerRowGroup.displayName = 'DatePickerRowGroup'
