import { datePickerAnatomy } from '@ark-ui/anatomy'
import type { ViewProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerViewProvider } from './use-date-picker-view-context'

export interface DatePickerViewProps extends Assign<HTMLArkProps<'div'>, Required<ViewProps>> {}

export const DatePickerView = (props: DatePickerViewProps) => {
  const [viewProps, localProps] = createSplitProps<Required<ViewProps>>()(props, ['view'])
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => datePickerAnatomy.build().view.attrs, localProps)

  return (
    <DatePickerViewProvider value={viewProps}>
      <ark.div {...mergedProps} hidden={api().view !== viewProps.view} />
    </DatePickerViewProvider>
  )
}
