import { Portal } from '@ark-ui/react'
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Stack } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'
import {
  DatePicker,
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
  DatePickerPositioner,
  DatePickerPrevTrigger,
  DatePickerRow,
  DatePickerRowGroup,
  DatePickerRowHeader,
  DatePickerTrigger,
  DatePickerViewTrigger,
  DatePickerYearCell,
  DatePickerYearCellTrigger,
} from '~/components/ui/date-picker'
import { IconButton } from '~/components/ui/icon-button'
import { Input } from '~/components/ui/input'

export const DatePickerDemo = () => {
  return (
    <DatePicker positioning={{ sameWidth: true }} selectionMode="range">
      {(api) => (
        <>
          <DatePickerControl>
            <Stack direction="row">
              <DatePickerInput asChild>
                <Input />
              </DatePickerInput>
              <DatePickerTrigger asChild>
                <IconButton variant="secondary" aria-label="Open date picker">
                  <FiCalendar />
                </IconButton>
              </DatePickerTrigger>
            </Stack>
          </DatePickerControl>
          <Portal>
            <DatePickerPositioner>
              <DatePickerContent>
                <Stack gap="3">
                  <Stack justify="space-between" direction="row">
                    <DatePickerPrevTrigger asChild>
                      <IconButton size="sm" variant="tertiary" aria-label="Prev">
                        <FiChevronLeft />
                      </IconButton>
                    </DatePickerPrevTrigger>
                    <DatePickerViewTrigger asChild>
                      <Button variant="tertiary" size="sm">
                        {api.view === 'day' && api.visibleRangeText.start}
                        {api.view === 'month' && api.visibleRange.start.year}
                        {api.view === 'year' && `${api.getDecade().start} - ${api.getDecade().end}`}
                      </Button>
                    </DatePickerViewTrigger>
                    <DatePickerNextTrigger asChild>
                      <IconButton size="sm" variant="tertiary" aria-label="Next">
                        <FiChevronRight />
                      </IconButton>
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
                                <DatePickerDayCellTrigger asChild>
                                  <Button variant="tertiary" px="0">
                                    {day.day}
                                  </Button>
                                </DatePickerDayCellTrigger>
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
                                <DatePickerMonthCellTrigger asChild>
                                  <Button variant="tertiary">{month.label}</Button>
                                </DatePickerMonthCellTrigger>
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
                                <DatePickerYearCellTrigger>
                                  <Button variant="tertiary">{year.label}</Button>
                                </DatePickerYearCellTrigger>
                              </DatePickerYearCell>
                            ))}
                          </DatePickerRow>
                        ))}
                      </DatePickerRowGroup>
                    </DatePickerGrid>
                  )}
                </Stack>
              </DatePickerContent>
            </DatePickerPositioner>
          </Portal>
        </>
      )}
    </DatePicker>
  )
}
