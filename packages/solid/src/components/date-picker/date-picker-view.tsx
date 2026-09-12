import type { ViewProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { DatePickerViewProvider } from './use-date-picker-view-props-context.ts'

export interface DatePickerViewBaseProps extends Required<ViewProps>, PolymorphicProps<'div'> {}
export interface DatePickerViewProps extends HTMLProps<'div'>, DatePickerViewBaseProps {}

export const DatePickerView = (props: DatePickerViewProps) => {
  const [viewProps, localProps] = createSplitProps<Required<ViewProps>>()(props, ['view'])
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getViewProps(viewProps), localProps)

  return (
    <DatePickerViewProvider value={viewProps}>
      <ark.div {...mergedProps} />
    </DatePickerViewProvider>
  )
}
