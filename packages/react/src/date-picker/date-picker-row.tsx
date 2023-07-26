import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { parts } from './date-picker.anatomy'

export type DatePickerRowProps = HTMLArkProps<'div'>

export const DatePickerRow = forwardRef<'div'>((props, ref) => (
  <ark.div role="row" {...parts.row.attrs} {...props} ref={ref} />
))
