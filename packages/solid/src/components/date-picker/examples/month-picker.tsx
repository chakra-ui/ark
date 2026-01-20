import { DatePicker } from '@ark-ui/solid/date-picker'
import { CalendarDate, type DateValue } from '@internationalized/date'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

const format = (date: DateValue) => {
  const month = date.month.toString().padStart(2, '0')
  const year = date.year.toString()
  return `${month}/${year}`
}

const parse = (string: string) => {
  const fullRegex = /^(\d{1,2})\/(\d{4})$/
  const fullMatch = string.match(fullRegex)
  if (fullMatch) {
    const [_, month, year] = fullMatch.map(Number)
    return new CalendarDate(year, month, 1)
  }
}

export const MonthPicker = () => {
  return (
    <DatePicker.Root
      className={styles.Root}
      format={format}
      parse={parse}
      defaultView="month"
      minView="month"
      placeholder="mm/yyyy"
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
            <DatePicker.View view="month" className={styles.View}>
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
                      <Index each={context().getMonthsGrid({ columns: 4, format: 'short' })}>
                        {(months) => (
                          <DatePicker.TableRow className={styles.TableRow}>
                            <Index each={months()}>
                              {(month) => (
                                <DatePicker.TableCell className={styles.TableCell} value={month().value}>
                                  <DatePicker.TableCellTrigger className={styles.TableCellTrigger}>
                                    {month().label}
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
