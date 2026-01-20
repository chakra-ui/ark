import { DatePicker } from '@ark-ui/solid/date-picker'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { For, Index } from 'solid-js'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

export const MultiSelection = () => {
  return (
    <DatePicker.Root className={styles.Root} selectionMode="multiple">
      <DatePicker.Label className={styles.Label}>Label</DatePicker.Label>
      <DatePicker.Control className={styles.Control}>
        <DatePicker.Context>
          {(context) => (
            <div>
              {context().value.length === 0 ? (
                <span>Select dates...</span>
              ) : (
                <For each={context().value}>
                  {(date, index) => (
                    <span>
                      {date.toDate('UTC').toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                      <button onClick={() => context().setValue(context().value.filter((_, i) => i !== index()))}>
                        x
                      </button>
                    </span>
                  )}
                </For>
              )}
            </div>
          )}
        </DatePicker.Context>
        <DatePicker.Trigger className={styles.Trigger}>
          <CalendarIcon />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger className={button.Root}>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content className={styles.Content}>
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
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}
