import type { ViewProps } from '@zag-js/date-picker'
import { anatomy } from '@zag-js/datePicker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerViewProvider } from './use-date-picker-view-props-context'

export interface DatePickerViewBaseProps extends Required<ViewProps>, PolymorphicProps<'div'> {}
export interface DatePickerViewProps extends HTMLProps<'div'>, DatePickerViewBaseProps {}

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
