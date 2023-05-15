import type { Meta } from '@storybook/react'
import {
  DatePicker,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerClearTrigger,
  DatePickerColumnHeader,
  DatePickerContent,
  DatePickerControl,
  DatePickerGrid,
  DatePickerInput,
  DatePickerMonthSelect,
  DatePickerNextTrigger,
  DatePickerPrevTrigger,
  DatePickerRow,
  DatePickerRowGroup,
  DatePickerRowHeader,
  DatePickerTrigger,
  DatePickerViewTrigger,
  DatePickerYearSelect,
} from './'
import './date-picker.css'

type DatePickerType = typeof DatePicker

const meta: Meta<DatePickerType> = {
  title: 'DatePicker',
  component: DatePicker,
}

export default meta

export const Basic = () => (
  <DatePicker selectionMode="single">
    {(api) => (
      <>
        <DatePickerControl>
          <span>View mode: {api.view}</span>
          <DatePickerInput />
          <DatePickerTrigger>🗓</DatePickerTrigger>
          <DatePickerClearTrigger>Clear</DatePickerClearTrigger>
        </DatePickerControl>
        <DatePickerContent>
          <DatePickerYearSelect />
          <DatePickerMonthSelect />
          <div>
            <DatePickerPrevTrigger>Prev</DatePickerPrevTrigger>
            <DatePickerViewTrigger>
              {api.view === 'day' && api.visibleRangeText.start}
              {api.view === 'month' && api.visibleRange.start.year}
              {api.view === 'year' && api.getDecade().start} - {api.getDecade().end}
            </DatePickerViewTrigger>
            <DatePickerNextTrigger>Next</DatePickerNextTrigger>#
          </div>
          {api.view === 'day' && (
            <DatePickerGrid view="day">
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
                    {week.map((day, id) => (
                      <DatePickerCell key={id} value={day.value}>
                        <DatePickerCellTrigger>{day.label}</DatePickerCellTrigger>
                      </DatePickerCell>
                    ))}
                  </DatePickerRow>
                ))}
              </DatePickerRowGroup>
            </DatePickerGrid>
          )}
          {api.view === 'month' && (
            <DatePickerGrid view="month">
              <DatePickerRowGroup>
                {api.getMonths({ columns: 4, format: 'short' }).map((months, row) => (
                  <DatePickerRow key={row}>
                    {months.map((month, index) => (
                      <DatePickerCell key={index} value={month.value}>
                        <DatePickerCellTrigger>{month.label}</DatePickerCellTrigger>
                      </DatePickerCell>
                    ))}
                  </DatePickerRow>
                ))}
              </DatePickerRowGroup>
            </DatePickerGrid>
          )}
          {api.view === 'year' && (
            <DatePickerGrid view="year">
              <DatePickerRowGroup>
                {api.getYears({ columns: 4 }).map((years, row) => (
                  <DatePickerRow key={row}>
                    {years.map((year, index) => (
                      <DatePickerCell key={index} value={year.value}>
                        <DatePickerCellTrigger>{year.label}</DatePickerCellTrigger>
                      </DatePickerCell>
                    ))}
                  </DatePickerRow>
                ))}
              </DatePickerRowGroup>
            </DatePickerGrid>
          )}
        </DatePickerContent>
      </>
    )}
  </DatePicker>
)
