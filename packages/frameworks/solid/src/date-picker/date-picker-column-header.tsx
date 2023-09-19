import { datePickerAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'

export type DatePickerColumnHeaderProps = HTMLArkProps<'div'>

export const DatePickerColumnHeader = (props: DatePickerColumnHeaderProps) => {
  const mergedProps = mergeProps(() => datePickerAnatomy.build().columnHeader.attrs, props)

  return <ark.div role="columnheader" {...mergedProps} />
}
