import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { parts } from './date-picker.anatomy'

export type DatePickerRowGroupProps = HTMLArkProps<'div'>

export const DatePickerRowGroup = forwardRef<'div'>((props, ref) => (
  <ark.div role="rowgroup" {...parts.rowGroup.attrs} {...props} ref={ref} />
))
