import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerRowHeaderProps = HTMLArkProps<'div'>

export const DatePickerRowHeader = (props: DatePickerRowHeaderProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().getHeaderProps({ view: 'day' }), props)

  return <ark.div role="row" {...mergedProps} aria-hidden={false} />
}
