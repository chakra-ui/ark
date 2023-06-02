import { ark, type HTMLArkProps } from '../factory'
import { parts } from './date-picker.anatomy'

export type DatePickerColumnHeaderProps = HTMLArkProps<'div'>

export const DatePickerColumnHeader = (props: DatePickerColumnHeaderProps) => (
  <ark.div role="columnheader" {...parts.columnHeader.attrs} {...props} />
)
