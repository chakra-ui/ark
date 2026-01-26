import { DatePicker, parseDate } from '@ark-ui/react/date-picker'
import { Portal } from '@ark-ui/react/portal'
import type { DateValue } from '@internationalized/date'
import { CalendarIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

const format = (date: DateValue) => date.year.toString()

const parse = (string: string | undefined) => {
  if (string === '' || !string) return
  const year = Number(string)
  if (year < 100) {
    const currentYear = new Date().getFullYear()
    const currentCentury = Math.floor(currentYear / 100) * 100
    return parseDate(new Date(currentCentury + year, 0))
  }
  return parseDate(new Date(Number(string), 0))
}

export const YearPicker = () => {
  return (
    <DatePicker.Root
      className={styles.Root}
      format={format}
      parse={parse}
      defaultView="year"
      minView="year"
      placeholder="yyyy"
    >
      <DatePicker.Label className={styles.Label}>Label</DatePicker.Label>
      <DatePicker.Control className={styles.Control}>
        <DatePicker.Input className={styles.Input} />
        <DatePicker.Trigger className={styles.Trigger}>
          <CalendarIcon />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger className={button.Root}>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content className={styles.Content}>
            <DatePicker.View view="year" className={styles.View}>
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
