import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { parts } from './date-picker.anatomy'

export type DatePickerColumnHeaderProps = HTMLArkProps<'div'>

export const DatePickerColumnHeader = forwardRef<'div'>((props, ref) => {
  return <ark.div role="columnheader" {...parts.columnHeader.attrs} {...props} ref={ref} />
})
