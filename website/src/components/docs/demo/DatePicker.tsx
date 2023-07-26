import { Button } from '@/components/shared/Button'
import { IconButton } from '@/components/shared/IconButton'
import { Input } from '@/components/shared/Input'
import { Text } from '@/components/shared/Text'
import { Box, Stack } from '@/panda/jsx'
import { datePicker } from '@/panda/recipes'
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
  DatePickerPrevTrigger,
  DatePickerRow,
  DatePickerRowGroup,
  DatePickerRowHeader,
  DatePickerTrigger,
  DatePickerViewTrigger,
  DatePickerYearCell,
  DatePickerYearCellTrigger,
} from '@ark-ui/react'
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export const DemoDatePicker = () => {
  return (
    <DatePicker>
      {(api) => (
        <Stack>
          <DatePickerControl>
            <Stack direction="row">
              <DatePickerInput asChild placeholder="">
                <Input placeholder="" />
              </DatePickerInput>
              <DatePickerTrigger asChild>
                <IconButton
                  icon={<FiCalendar />}
                  variant="secondary"
                  aria-label="Open date picker"
                />
              </DatePickerTrigger>
            </Stack>
          </DatePickerControl>
          <DatePickerContent className={datePicker()}>
            <Stack gap="3">
              <Stack gap="3" justify="space-between" direction="row">
                <DatePickerInput asChild>
                  <Input placeholder="" />
                </DatePickerInput>
                <Button variant="secondary" onClick={api.selectToday}>
                  Today
                </Button>
              </Stack>
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
                    {api.view === 'day' && api.visibleRangeText.start}
                    {api.view === 'month' && api.visibleRange.start.year}
                    {api.view === 'year' && `${api.getDecade().start} - ${api.getDecade().end}`}
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
            </Stack>
          </DatePickerContent>
        </Stack>
      )}
    </DatePicker>
  )
}

export const DemoDatePickerMulti = () => {
  return (
    <DatePicker numOfMonths={2} selectionMode="range">
      {(api) => (
        <Stack>
          <DatePickerControl>
            <Stack direction="row">
              <DatePickerInput asChild placeholder="">
                <Input placeholder="" minW="608px" />
              </DatePickerInput>
              <DatePickerTrigger asChild>
                <IconButton
                  icon={<FiCalendar />}
                  variant="secondary"
                  aria-label="Open date picker"
                />
              </DatePickerTrigger>
            </Stack>
          </DatePickerControl>
          <DatePickerContent className={datePicker()}>
            <Stack direction="row" gap="12">
              <Stack gap="3">
                <Stack justify="space-between" direction="row" align="center">
                  <DatePickerPrevTrigger asChild>
                    <IconButton
                      icon={<FiChevronLeft />}
                      size="sm"
                      variant="tertiary"
                      aria-label="Prev"
                    />
                  </DatePickerPrevTrigger>
                  <Text fontWeight="semibold">{api.visibleRangeText.start}</Text>
                  <Box width="9" />
                </Stack>
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
              </Stack>
              <Stack gap="3">
                <Stack justify="space-between" direction="row" align="center">
                  <Box width="9" />
                  <Text fontWeight="semibold">{api.visibleRangeText.end}</Text>
                  <DatePickerNextTrigger asChild>
                    <IconButton
                      icon={<FiChevronRight />}
                      size="sm"
                      variant="tertiary"
                      aria-label="Next"
                    />
                  </DatePickerNextTrigger>
                </Stack>
                <DatePickerGrid>
                  <DatePickerRowHeader>
                    {api.weekDays.map((day, i) => (
                      <DatePickerColumnHeader key={i} aria-label={day.long}>
                        {day.narrow}
                      </DatePickerColumnHeader>
                    ))}
                  </DatePickerRowHeader>
                  <DatePickerRowGroup>
                    {api.getOffset(1).weeks.map((week, id) => (
                      <DatePickerRow key={id}>
                        {week.map((day, id) => (
                          <DatePickerDayCell key={id} value={day} offset={api.getOffset(1)}>
                            <DatePickerDayCellTrigger>{day.day}</DatePickerDayCellTrigger>
                          </DatePickerDayCell>
                        ))}
                      </DatePickerRow>
                    ))}
                  </DatePickerRowGroup>
                </DatePickerGrid>
              </Stack>
            </Stack>
          </DatePickerContent>
        </Stack>
      )}
    </DatePicker>
  )
}
