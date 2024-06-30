import type { ViewProps } from '@zag-js/date-picker'
import { anatomy } from '@zag-js/datePicker'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerViewPropsProvider } from './use-date-picker-view-props-context'

export interface DatePickerViewBaseProps extends Required<ViewProps>, PolymorphicProps {}
export interface DatePickerViewProps extends HTMLProps<'div'>, DatePickerViewBaseProps {}

export const DatePickerView = forwardRef<HTMLDivElement, DatePickerViewProps>((props, ref) => {
  const [viewProps, localProps] = createSplitProps<Required<ViewProps>>()(props, ['view'])
  const datePicker = useDatePickerContext()

  return (
    <DatePickerViewPropsProvider value={viewProps}>
      <ark.div
        hidden={datePicker.view !== viewProps.view}
        {...datePickerAnatomy.build().view.attrs}
        {...localProps}
        ref={ref}
      />
    </DatePickerViewPropsProvider>
  )
})

DatePickerView.displayName = 'DatePickerView'
