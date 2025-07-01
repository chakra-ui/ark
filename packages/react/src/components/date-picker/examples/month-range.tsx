import { DatePicker } from '@ark-ui/react/date-picker'
import { CalendarDate, type DateValue } from '@internationalized/date'
import { useState } from 'react'

// convert date to mm/yyyy format
const format = (date: DateValue) => {
  const month = date.month.toString().padStart(2, '0')
  const year = date.year.toString()
  return `${month}/${year}`
}

// Handle full mm/yyyy format
const parse = (string: string) => {
  const fullRegex = /^(\d{1,2})\/(\d{4})$/
  const fullMatch = string.match(fullRegex)
  if (fullMatch) {
    const [_, month, year] = fullMatch.map(Number)
    return new CalendarDate(year, month, 1)
  }
}

const ViewTrigger = () => {
  return (
    <DatePicker.ViewControl>
      <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
      <DatePicker.ViewTrigger>
        <DatePicker.RangeText />
      </DatePicker.ViewTrigger>
      <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
    </DatePicker.ViewControl>
  )
}

export const MonthRange = () => {
  const [value, setValue] = useState<DateValue[]>([])

  return (
    <DatePicker.Root
      open
      selectionMode="range"
      format={format}
      parse={parse}
      defaultView="month"
      minView="month"
      placeholder="mm/yyyy"
      value={value}
      onValueChange={(details) => {
        setValue(details.value)
      }}
    >
      {JSON.stringify(value)}
      <DatePicker.Content>
        <DatePicker.View view="month">
          <ViewTrigger />
          <DatePicker.Context>
            {(datePicker) => (
              <DatePicker.Table>
                <DatePicker.TableBody>
                  {datePicker.getMonthsGrid({ columns: 4, format: 'short' }).map((months, id) => (
                    <DatePicker.TableRow key={id}>
                      {months.map((month, id) => (
                        <DatePicker.TableCell key={id} value={month.value}>
                          <DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
                        </DatePicker.TableCell>
                      ))}
                    </DatePicker.TableRow>
                  ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            )}
          </DatePicker.Context>
        </DatePicker.View>

        <DatePicker.View view="year">
          <ViewTrigger />
          <DatePicker.Context>
            {(datePicker) => (
              <DatePicker.Table>
                <DatePicker.TableBody>
                  {datePicker.getYearsGrid({ columns: 4 }).map((years, id) => (
                    <DatePicker.TableRow key={id}>
                      {years.map((year, id) => (
                        <DatePicker.TableCell key={id} value={year.value}>
                          <DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
                        </DatePicker.TableCell>
                      ))}
                    </DatePicker.TableRow>
                  ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            )}
          </DatePicker.Context>
        </DatePicker.View>
      </DatePicker.Content>
    </DatePicker.Root>
  )
}
