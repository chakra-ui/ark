import { DatePicker, parseDate } from '@ark-ui/react/date-picker'
import type { DateValue } from '@internationalized/date'
import { useState } from 'react'

const format = (date: DateValue) => {
  const year = date.year.toString()
  return year
}

const parse = (string: string) => {
  if (string === '') return
  // account for yy
  const year = Number(string)
  if (year < 100) {
    const currentYear = new Date().getFullYear()
    const currentCentury = Math.floor(currentYear / 100) * 100
    return parseDate(new Date(currentCentury + year, 0))
  }
  return string ? parseDate(new Date(Number(string), 0)) : undefined
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

export const YearPickerRange = () => {
  const [value, setValue] = useState<DateValue[]>([])

  return (
    <DatePicker.Root
      open
      format={format}
      parse={parse}
      defaultView="year"
      minView="year"
      selectionMode="range"
      placeholder="yyyy"
      value={value}
      onValueChange={(details) => {
        setValue(details.value)
      }}
    >
      {JSON.stringify(value)}
      <DatePicker.Content>
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
