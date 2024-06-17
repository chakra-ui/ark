import { datePickerAnatomy } from '@ark-ui/anatomy'
import type { ViewProps } from '@zag-js/date-picker'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerViewPropsProvider } from './use-date-picker-view-props-context'

export interface DatePickerViewBaseProps extends Required<ViewProps>, PolymorphicProps {}
export interface DatePickerViewProps
  extends HTMLAttributes<HTMLDivElement>,
    DatePickerViewBaseProps {}

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
