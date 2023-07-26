import { ark, type HTMLArkProps } from '../factory'
import { parts } from './date-picker.anatomy'

export type DatePickerRowGroupProps = HTMLArkProps<'div'>

export const DatePickerRowGroup = (props: DatePickerRowGroupProps) => (
  <ark.div role="rowgroup" {...parts.rowGroup.attrs} {...props} />
)
