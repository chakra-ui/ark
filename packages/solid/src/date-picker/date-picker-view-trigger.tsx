import type { ViewProps } from '@zag-js/date-picker/dist/date-picker.types'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerViewTriggerProps = Assign<HTMLArkProps<'button'>, ViewProps>

export const DatePickerViewTrigger = (props: DatePickerViewTriggerProps) => {
  const [viewProps, localProps] = createSplitProps<ViewProps>()(props, ['view'])
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(
    () => datePicker().getViewTriggerProps({ view: viewProps.view ?? datePicker().view }),
    localProps,
  )

  return <ark.button {...mergedProps} />
}
