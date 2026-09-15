'use client'

import type { ViewProps } from '@zag-js/date-picker'
import { forwardRef } from 'react'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { DatePickerViewPropsProvider } from './use-date-picker-view-props-context.ts'

export interface DatePickerViewBaseProps extends Required<ViewProps>, PolymorphicProps {}
export interface DatePickerViewProps extends HTMLProps<'div'>, DatePickerViewBaseProps {}

const splitViewProps = createSplitProps<Required<ViewProps>>()

export const DatePickerView = forwardRef<HTMLDivElement, DatePickerViewProps>((props, ref) => {
  const [viewProps, localProps] = splitViewProps(props, ['view'])
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getViewProps(viewProps), localProps)

  return (
    <DatePickerViewPropsProvider value={viewProps}>
      <ark.div {...mergedProps} ref={ref} />
    </DatePickerViewPropsProvider>
  )
})

DatePickerView.displayName = 'DatePickerView'
