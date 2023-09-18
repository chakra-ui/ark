import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerPositionerProps = HTMLArkProps<'div'>

export const DatePickerPositioner = (props: DatePickerPositionerProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().positionerProps, props)

  return <ark.div {...mergedProps} />
}
