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
  DatePickerMonthCell,
  DatePickerMonthCellTrigger,
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
          {api.view === 'day' && (
            <>
              <div>
                <DatePickerPrevTrigger>Prev</DatePickerPrevTrigger>
                <DatePickerViewTrigger>{api.visibleRangeText.start}</DatePickerViewTrigger>
                <DatePickerNextTrigger>Next</DatePickerNextTrigger>
              </div>
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
          )}
          {api.view === 'month' && (
            <>
              <div>
                <DatePickerPrevTrigger>Prev</DatePickerPrevTrigger>
                <DatePickerViewTrigger>{api.visibleRange.start.year}</DatePickerViewTrigger>
                <DatePickerNextTrigger>Next</DatePickerNextTrigger>
              </div>
              <DatePickerGrid view="day">
                <DatePickerRowGroup>
                  {api.getMonths({ columns: 4, format: 'short' }).map((months, row) => (
                    <DatePickerRow key={row}>
                      {months.map((month, index) => {
                        const value = row * 4 + index + 1
                        return (
                          <DatePickerMonthCell key={index} value={value}>
                            <DatePickerMonthCellTrigger>{month}</DatePickerMonthCellTrigger>
                          </DatePickerMonthCell>
                        )
                      })}
                    </DatePickerRow>
                  ))}
                </DatePickerRowGroup>
              </DatePickerGrid>
            </>
          )}
          {api.view === 'year' && (
            <>
              <div>
                <DatePickerPrevTrigger>Prev</DatePickerPrevTrigger>
                <DatePickerViewTrigger>
                  {api.getDecade().start} - {api.getDecade().end}
                </DatePickerViewTrigger>
                <DatePickerNextTrigger>Next</DatePickerNextTrigger>
              </div>
              <DatePickerGrid>
                <DatePickerRowGroup>
                  {api.getYears({ columns: 4 }).map((years, row) => (
                    <DatePickerRow key={row}>
                      {years.map((year, index) => (
                        <td colSpan={4} key={index} {...api.getYearCellProps({ value: year })}>
                          {year}
                        </td>
                      ))}
                    </DatePickerRow>
                  ))}
                </DatePickerRowGroup>
              </DatePickerGrid>
            </>
          )}
        </DatePickerContent>
      </>
    )}
  </DatePicker>
)
