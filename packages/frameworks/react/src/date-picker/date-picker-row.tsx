import { datePickerAnatomy } from '@ark-ui/anatomy'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'

export type DatePickerRowProps = HTMLArkProps<'div'>

export const DatePickerRow = forwardRef<HTMLDivElement, DatePickerRowProps>((props, ref) => (
  <ark.div role="row" {...datePickerAnatomy.build().row.attrs} {...props} ref={ref} />
))

DatePickerRow.displayName = 'DatePickerRow'
