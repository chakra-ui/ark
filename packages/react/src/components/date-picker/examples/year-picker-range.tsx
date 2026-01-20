import { DatePicker } from '@ark-ui/react/date-picker'
import { Portal } from '@ark-ui/react/portal'
import { CalendarDate, type DateValue } from '@internationalized/date'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

const format = (date: DateValue) => date.year.toString()

const parse = (string: string) => {
  const fullRegex = /^(\d{4})$/
  const fullMatch = string.match(fullRegex)
  if (fullMatch) {
    const [_, year] = fullMatch.map(Number)
    return new CalendarDate(year, 1, 1)
  }
}

export const YearPickerRange = () => {
  return (
    <DatePicker.Root
      className={styles.Root}
      selectionMode="range"
      defaultView="year"
      minView="year"
      format={format}
      parse={parse}
      placeholder="yyyy"
    >
      <DatePicker.Label className={styles.Label}>Label</DatePicker.Label>
      <DatePicker.Control className={styles.Control}>
        <DatePicker.Input className={styles.Input} index={0} />
        <DatePicker.Input className={styles.Input} index={1} />
        <DatePicker.Trigger className={styles.Trigger}>
          <CalendarIcon />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger className={button.Root}>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content className={styles.Content}>
            <DatePicker.View view="year" className={styles.View}>
              <DatePicker.ViewControl className={styles.ViewControl}>
                <DatePicker.PrevTrigger className={styles.PrevTrigger}>
                  <ChevronLeftIcon />
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger className={styles.ViewTrigger}>
                  <DatePicker.RangeText />
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger className={styles.NextTrigger}>
                  <ChevronRightIcon />
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Context>
                {(datePicker) => (
                  <DatePicker.Table className={styles.Table}>
                    <DatePicker.TableBody className={styles.TableBody}>
                      {datePicker.getYearsGrid({ columns: 4 }).map((years, id) => (
                        <DatePicker.TableRow className={styles.TableRow} key={id}>
                          {years.map((year, id) => (
                            <DatePicker.TableCell className={styles.TableCell} key={id} value={year.value}>
                              <DatePicker.TableCellTrigger className={styles.YearTableCellTrigger}>
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
