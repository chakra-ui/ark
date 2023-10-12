import type { ViewProps } from '@zag-js/date-picker'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'
import { DatePickerViewProvider } from './date-picker-view-context'
import type { UseDatePickerReturn } from './use-date-picker'

export type DatePickerViewProps = Assign<
  HTMLArkProps<'div'>,
  Required<ViewProps> & {
    children?: JSX.Element | ((state: UseDatePickerReturn) => JSX.Element)
  }
>
export const DatePickerView = (props: DatePickerViewProps) => {
  const [viewProps, localProps] = createSplitProps<Required<ViewProps>>()(props, ['view'])
  const api = useDatePickerContext()
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <DatePickerViewProvider value={viewProps}>
      <ark.div {...localProps} hidden={api().view !== viewProps.view}>
        {getChildren()}
      </ark.div>
    </DatePickerViewProvider>
  )
}
