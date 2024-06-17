import { datePickerAnatomy } from '@ark-ui/anatomy'
import type { ViewProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerViewProvider } from './use-date-picker-view-props-context'

export interface DatePickerViewBaseProps extends Required<ViewProps>, PolymorphicProps<'div'> {}
export interface DatePickerViewProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    DatePickerViewBaseProps {}

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
