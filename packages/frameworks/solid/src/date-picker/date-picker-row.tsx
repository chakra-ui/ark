import { datePickerAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'

export type DatePickerRowProps = HTMLArkProps<'div'>

export const DatePickerRow = (props: DatePickerRowProps) => {
  const mergedProps = mergeProps(() => datePickerAnatomy.build().row.attrs, props)

  return <ark.div role="row" {...mergedProps} />
}
