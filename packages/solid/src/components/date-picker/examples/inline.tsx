import { DatePicker } from '@ark-ui/solid/date-picker'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import styles from 'styles/date-picker.module.css'

export const Inline = () => {
  return (
    <DatePicker.Root class={styles.Root} inline>
      <DatePicker.Input class={styles.Input} />
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
                        <DatePicker.TableHeader class={styles.TableHeader}>{weekDay().short}</DatePicker.TableHeader>
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
    </DatePicker.Root>
  )
}
