import { DatePicker, parseDate } from '@ark-ui/react/date-picker'
import { Portal } from '@ark-ui/react/portal'
import type { DateValue } from '@internationalized/date'

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

export const YearPicker = () => {
  return (
    <DatePicker.Root
      format={format}
      parse={parse}
      defaultView="year"
      minView="year"
      placeholder="yyyy"
    >
      <DatePicker.Label>Label</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.Trigger>📅</DatePicker.Trigger>
        <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
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
                              <DatePicker.TableCellTrigger>
                                {year.label}
                              </DatePicker.TableCellTrigger>
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
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}
