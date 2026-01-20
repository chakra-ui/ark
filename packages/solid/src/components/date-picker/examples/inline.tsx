import { DatePicker } from '@ark-ui/solid/date-picker'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import styles from 'styles/date-picker.module.css'

export const Inline = () => {
  return (
    <DatePicker.Root className={styles.Root} inline>
      <DatePicker.Input className={styles.Input} />
      <DatePicker.View view="day" className={styles.View}>
        <DatePicker.Context>
          {(context) => (
            <>
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
              <DatePicker.Table className={styles.Table}>
                <DatePicker.TableHead className={styles.TableHead}>
                  <DatePicker.TableRow className={styles.TableRow}>
                    <Index each={context().weekDays}>
                      {(weekDay) => (
                        <DatePicker.TableHeader className={styles.TableHeader}>
                          {weekDay().short}
                        </DatePicker.TableHeader>
                      )}
                    </Index>
                  </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody className={styles.TableBody}>
                  <Index each={context().weeks}>
                    {(week) => (
                      <DatePicker.TableRow className={styles.TableRow}>
                        <Index each={week()}>
                          {(day) => (
                            <DatePicker.TableCell className={styles.TableCell} value={day()}>
                              <DatePicker.TableCellTrigger className={styles.TableCellTrigger}>
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
      <DatePicker.View view="month" className={styles.View}>
        <DatePicker.Context>
          {(context) => (
            <>
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
            </>
          )}
        </DatePicker.Context>
      </DatePicker.View>
      <DatePicker.View view="year" className={styles.View}>
        <DatePicker.Context>
          {(context) => (
            <>
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
            </>
          )}
        </DatePicker.Context>
      </DatePicker.View>
    </DatePicker.Root>
  )
}
