import { DatePicker } from '@ark-ui/solid/date-picker'
import { CalendarDate, type DateValue } from '@internationalized/date'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

const format = (date: DateValue) => date.year.toString()

const parse = (string: string | undefined) => {
  if (!string) return
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
      class={styles.Root}
      selectionMode="range"
      defaultView="year"
      minView="year"
      format={format}
      parse={parse}
      placeholder="yyyy"
    >
      <DatePicker.Label class={styles.Label}>Label</DatePicker.Label>
      <DatePicker.Control class={styles.Control}>
        <DatePicker.Input class={styles.Input} index={0} />
        <DatePicker.Input class={styles.Input} index={1} />
        <DatePicker.Trigger class={styles.Trigger}>
          <CalendarIcon />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger class={button.Root}>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content class={styles.Content}>
            <DatePicker.View view="year" class={styles.View}>
              <DatePicker.Context>
                {(context) => (
                  <>
                    <DatePicker.ViewControl class={styles.ViewControl}>
                      <DatePicker.PrevTrigger class={styles.PrevTrigger}>
                        <ChevronLeftIcon />
                      </DatePicker.PrevTrigger>
                      <span class={styles.ViewTrigger}>
                        {context().getDecade().start} - {context().getDecade().end}
                      </span>
                      <DatePicker.NextTrigger class={styles.NextTrigger}>
                        <ChevronRightIcon />
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table class={styles.Table}>
                      <DatePicker.TableBody class={styles.TableBody}>
                        <Index each={context().getYearsGrid({ columns: 4 })}>
                          {(years) => (
                            <DatePicker.TableRow class={styles.TableRow}>
                              <Index each={years()}>
                                {(year) => (
                                  <DatePicker.TableCell class={styles.TableCell} value={year().value}>
                                    <DatePicker.TableCellTrigger class={styles.YearTableCellTrigger}>
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
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}
