import { DatePicker, parseDate } from '@ark-ui/solid/date-picker'
import type { DateValue } from '@internationalized/date'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import { Portal } from 'solid-js/web'
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
                {(context) => (
                  <DatePicker.Table className={styles.Table}>
                    <DatePicker.TableBody className={styles.TableBody}>
                      <Index each={context().getYearsGrid({ columns: 4 })}>
                        {(years) => (
                          <DatePicker.TableRow className={styles.TableRow}>
                            <Index each={years()}>
                              {(year) => (
                                <DatePicker.TableCell className={styles.TableCell} value={year().value}>
                                  <DatePicker.TableCellTrigger className={styles.TableCellTrigger}>
                                    {year().label}
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              )}
                            </Index>
                          </DatePicker.TableRow>
                        )}
                      </Index>
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
