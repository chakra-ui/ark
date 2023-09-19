import { datePickerAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'

export type DatePickerRowGroupProps = HTMLArkProps<'div'>

export const DatePickerRowGroup = (props: DatePickerRowGroupProps) => {
  const mergedProps = mergeProps(() => datePickerAnatomy.build().rowGroup.attrs, props)

  return <ark.div role="rowgroup" {...mergedProps} />
}
