import { ark, type HTMLArkProps } from '../factory'
import { parts } from './date-picker.anatomy'

export type DatePickerRowProps = HTMLArkProps<'div'>

export const DatePickerRow = (props: DatePickerRowProps) => (
  <ark.div role="row" {...parts.row.attrs} {...props} />
)
