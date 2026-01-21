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
      class={styles.Root}
      format={format}
      parse={parse}
      defaultView="year"
      minView="year"
      placeholder="yyyy"
    >
      <DatePicker.Label class={styles.Label}>Label</DatePicker.Label>
      <DatePicker.Control class={styles.Control}>
        <DatePicker.Input class={styles.Input} />
        <DatePicker.Trigger class={styles.Trigger}>
          <CalendarIcon />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger class={button.Root}>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content class={styles.Content}>
            <DatePicker.View view="year" class={styles.View}>
              <DatePicker.ViewControl class={styles.ViewControl}>
                <DatePicker.PrevTrigger class={styles.PrevTrigger}>
                  <ChevronLeftIcon />
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger class={styles.ViewTrigger}>
                  <DatePicker.RangeText />
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger class={styles.NextTrigger}>
                  <ChevronRightIcon />
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Context>
                {(context) => (
                  <DatePicker.Table class={styles.Table}>
                    <DatePicker.TableBody class={styles.TableBody}>
                      <Index each={context().getYearsGrid({ columns: 4 })}>
                        {(years) => (
                          <DatePicker.TableRow class={styles.TableRow}>
                            <Index each={years()}>
                              {(year) => (
                                <DatePicker.TableCell class={styles.TableCell} value={year().value}>
                                  <DatePicker.TableCellTrigger class={styles.TableCellTrigger}>
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
