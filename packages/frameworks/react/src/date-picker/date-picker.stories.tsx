import type { Meta } from '@storybook/react'
import { Portal } from '@zag-js/react'
import { DatePicker } from './'
import './date-picker.css'

type DatePickerType = typeof DatePicker

const meta: Meta<DatePickerType> = {
  title: 'DatePicker',
  component: DatePicker,
}

export default meta

export const Basic = () => {
  return (
    <DatePicker.Root>
      <DatePicker.Label>Framework</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.Trigger />
        <DatePicker.ClearTrigger />
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.YearSelect />
            <DatePicker.MonthSelect />
            <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
            <DatePicker.ViewTrigger>{/* <DatePicker.RangeText /> */}</DatePicker.ViewTrigger>
            <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
            {/* <DatePicker.View type="day" />
            <DatePicker.View type="month" />
            <DatePicker.View type="year" /> */}
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}
