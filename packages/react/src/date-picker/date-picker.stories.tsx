import type { Meta } from '@storybook/react'
import {
  DatePicker,
  DatePickerClearTrigger,
  DatePickerColumnHeader,
  DatePickerContent,
  DatePickerControl,
  DatePickerDayCell,
  DatePickerDayCellTrigger,
  DatePickerGrid,
  DatePickerInput,
  DatePickerMonthSelect,
  DatePickerRow,
  DatePickerRowGroup,
  DatePickerRowHeader,
  DatePickerTrigger,
  DatePickerYearSelect,
} from './'
import './date-picker.css'

type DatePickerType = typeof DatePicker

const meta: Meta<DatePickerType> = {
  title: 'DatePicker',
  component: DatePicker,
}

export default meta

export const Basic = () => {
  return (
    <DatePicker selectionMode="single">
      {(api) => (
        <>
          <DatePickerControl>
            <DatePickerInput />
            <DatePickerTrigger>🗓</DatePickerTrigger>
            <DatePickerClearTrigger>Clear</DatePickerClearTrigger>
          </DatePickerControl>
          <DatePickerContent>
            <>
              <DatePickerYearSelect />
              <DatePickerMonthSelect />
              <DatePickerGrid>
                <DatePickerRowHeader>
                  {api.weekDays.map((day, i) => (
                    <DatePickerColumnHeader key={i} aria-label={day.long}>
                      {day.narrow}
                    </DatePickerColumnHeader>
                  ))}
                </DatePickerRowHeader>
                <DatePickerRowGroup>
                  {api.weeks.map((week, id) => (
                    <DatePickerRow key={id}>
                      {week.map((day, id) => {
                        if (day === null) return <div />
                        return (
                          <DatePickerDayCell key={id} value={day}>
                            <DatePickerDayCellTrigger>{day.day}</DatePickerDayCellTrigger>
                          </DatePickerDayCell>
                        )
                      })}
                    </DatePickerRow>
                  ))}
                </DatePickerRowGroup>
              </DatePickerGrid>
            </>
          </DatePickerContent>
        </>
      )}
    </DatePicker>
  )
}
