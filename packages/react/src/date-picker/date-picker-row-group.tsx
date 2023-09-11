import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { parts } from './date-picker.anatomy'

export type DatePickerRowGroupProps = HTMLArkProps<'div'>

export const DatePickerRowGroup = forwardRef<HTMLDivElement, DatePickerRowGroupProps>(
  (props, ref) => <ark.div role="rowgroup" {...parts.rowGroup.attrs} {...props} ref={ref} />,
)

DatePickerRowGroup.displayName = 'DatePickerRowGroup'
