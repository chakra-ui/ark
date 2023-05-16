import { Button } from '@/components/shared/Button'
import { IconButton } from '@/components/shared/IconButton'
import { Stack } from '@/panda/jsx'
import { datePicker } from '@/panda/recipes'
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
  DatePickerNextTrigger,
  DatePickerPrevTrigger,
  DatePickerRow,
  DatePickerRowGroup,
  DatePickerRowHeader,
  DatePickerTrigger,
  DatePickerViewTrigger,
  DatePickerYearCell,
  DatePickerYearCellTrigger,
} from '@ark-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export const DemoDatePicker = () => {
  return (
    <DatePicker>
      {(api) => (
        <>
          <DatePickerControl>
            <span>View mode: {api.view}</span>
            <DatePickerInput />
            <DatePickerTrigger>🗓</DatePickerTrigger>
            <DatePickerClearTrigger>Clear</DatePickerClearTrigger>
          </DatePickerControl>
          <DatePickerContent className={datePicker()}>
            <Stack justify="space-between" direction="row">
              <DatePickerPrevTrigger asChild>
                <IconButton
                  icon={<FiChevronLeft />}
                  size="sm"
                  variant="tertiary"
                  aria-label="Prev"
                />
              </DatePickerPrevTrigger>
              <DatePickerViewTrigger asChild>
                <Button variant="tertiary" size="sm">
                  {api.visibleRangeText.start}
                </Button>
              </DatePickerViewTrigger>
              <DatePickerNextTrigger asChild>
                <IconButton
                  icon={<FiChevronRight />}
                  size="sm"
                  variant="tertiary"
                  aria-label="Next"
                />
              </DatePickerNextTrigger>
            </Stack>
            {api.view === 'day' && (
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
                      {week.map((day, id) => (
                        <DatePickerDayCell key={id} value={day}>
                          <DatePickerDayCellTrigger>{day.day}</DatePickerDayCellTrigger>
                        </DatePickerDayCell>
                      ))}
                    </DatePickerRow>
                  ))}
                </DatePickerRowGroup>
              </DatePickerGrid>
            )}
            {api.view === 'month' && (
              <DatePickerGrid>
                <DatePickerRowGroup>
                  {api.getMonthsGrid({ columns: 4, format: 'short' }).map((months, row) => (
                    <DatePickerRow key={row}>
                      {months.map((month, index) => (
                        <DatePickerMonthCell key={index} value={month.value}>
                          <DatePickerMonthCellTrigger>{month.label}</DatePickerMonthCellTrigger>
                        </DatePickerMonthCell>
                      ))}
                    </DatePickerRow>
                  ))}
                </DatePickerRowGroup>
              </DatePickerGrid>
            )}
            {api.view === 'year' && (
              <DatePickerGrid>
                <DatePickerRowGroup>
                  {api.getYearsGrid({ columns: 4 }).map((years, row) => (
                    <DatePickerRow key={row}>
                      {years.map((year, index) => (
                        <DatePickerYearCell key={index} value={year.value}>
                          <DatePickerYearCellTrigger>{year.label}</DatePickerYearCellTrigger>
                        </DatePickerYearCell>
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
}
