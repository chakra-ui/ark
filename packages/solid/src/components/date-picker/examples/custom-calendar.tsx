import { DatePicker } from '@ark-ui/solid/date-picker'
import { PersianCalendar } from '@internationalized/date'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

function createCalendar(identifier: string) {
  switch (identifier) {
    case 'persian':
      return new PersianCalendar()
    default:
      throw new Error(`Unsupported calendar: ${identifier}`)
  }
}

export const CustomCalendar = () => {
  return (
    <DatePicker.Root class={styles.Root} locale="fa-IR" createCalendar={createCalendar}>
      <DatePicker.Label class={styles.Label}>Label</DatePicker.Label>
      <DatePicker.Control class={styles.Control}>
        <DatePicker.Trigger class={button.Root} style={{ width: '100%', 'justify-content': 'space-between' }}>
          <DatePicker.ValueText placeholder="Select date" />
          <CalendarIcon />
        </DatePicker.Trigger>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content class={styles.Content}>
            <DatePicker.View view="day" class={styles.View}>
              <DatePicker.Context>
                {(context) => (
                  <>
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
                    <DatePicker.Table class={styles.Table}>
                      <DatePicker.TableHead class={styles.TableHead}>
                        <DatePicker.TableRow class={styles.TableRow}>
                          <Index each={context().weekDays}>
                            {(weekDay) => (
                              <DatePicker.TableHeader class={styles.TableHeader}>
                                {weekDay().short}
                              </DatePicker.TableHeader>
                            )}
                          </Index>
                        </DatePicker.TableRow>
                      </DatePicker.TableHead>
                      <DatePicker.TableBody class={styles.TableBody}>
                        <Index each={context().weeks}>
                          {(week) => (
                            <DatePicker.TableRow class={styles.TableRow}>
                              <Index each={week()}>
                                {(day) => (
                                  <DatePicker.TableCell class={styles.TableCell} value={day()}>
                                    <DatePicker.TableCellTrigger class={styles.TableCellTrigger}>
                                      {day().day}
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
            <DatePicker.View view="month" class={styles.View}>
              <DatePicker.Context>
                {(context) => (
                  <>
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
                    <DatePicker.Table class={styles.Table}>
                      <DatePicker.TableBody class={styles.TableBody}>
                        <Index each={context().getMonthsGrid({ columns: 4, format: 'short' })}>
                          {(months) => (
                            <DatePicker.TableRow class={styles.TableRow}>
                              <Index each={months()}>
                                {(month) => (
                                  <DatePicker.TableCell class={styles.TableCell} value={month().value}>
                                    <DatePicker.TableCellTrigger class={styles.TableCellTrigger}>
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
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="year" class={styles.View}>
              <DatePicker.Context>
                {(context) => (
                  <>
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
