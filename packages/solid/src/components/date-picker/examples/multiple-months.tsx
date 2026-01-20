import { DatePicker } from '@ark-ui/solid/date-picker'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { Index, createMemo } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

export const MultipleMonths = () => {
  return (
    <DatePicker.Root className={styles.Root} numOfMonths={2}>
      <DatePicker.Label className={styles.Label}>Label</DatePicker.Label>
      <DatePicker.Control className={styles.Control}>
        <DatePicker.Input className={styles.Input} index={0} />
        <DatePicker.Trigger className={styles.Trigger}>
          <CalendarIcon />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger className={button.Root}>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content className={styles.Content}>
          <DatePicker.ViewControl className={styles.ViewControl}>
            <DatePicker.PrevTrigger className={styles.PrevTrigger}>
              <ChevronLeftIcon />
            </DatePicker.PrevTrigger>
            <DatePicker.RangeText />
            <DatePicker.NextTrigger className={styles.NextTrigger}>
              <ChevronRightIcon />
            </DatePicker.NextTrigger>
          </DatePicker.ViewControl>
          <div style={{ display: 'flex', gap: '10px' }}>
            <DatePicker.Context>
              {(datePicker) => (
                <DatePicker.Table className={styles.Table}>
                  <DatePicker.TableHead className={styles.TableHead}>
                    <DatePicker.TableRow className={styles.TableRow}>
                      <Index each={datePicker().weekDays}>
                        {(weekDay) => (
                          <DatePicker.TableHeader className={styles.TableHeader}>
                            {weekDay().short}
                          </DatePicker.TableHeader>
                        )}
                      </Index>
                    </DatePicker.TableRow>
                  </DatePicker.TableHead>
                  <DatePicker.TableBody className={styles.TableBody}>
                    <Index each={datePicker().weeks}>
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
              )}
            </DatePicker.Context>
            <DatePicker.Context>
              {(datePicker) => {
                const offset = createMemo(() => datePicker().getOffset({ months: 1 }))
                return (
                  <DatePicker.Table className={styles.Table}>
                    <DatePicker.TableHead className={styles.TableHead}>
                      <DatePicker.TableRow className={styles.TableRow}>
                        <Index each={datePicker().weekDays}>
                          {(weekDay) => (
                            <DatePicker.TableHeader className={styles.TableHeader}>
                              {weekDay().short}
                            </DatePicker.TableHeader>
                          )}
                        </Index>
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>
                    <DatePicker.TableBody className={styles.TableBody}>
                      <Index each={offset().weeks}>
                        {(week) => (
                          <DatePicker.TableRow className={styles.TableRow}>
                            <Index each={week()}>
                              {(day) => (
                                <DatePicker.TableCell
                                  className={styles.TableCell}
                                  value={day()}
                                  visibleRange={offset().visibleRange}
                                >
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
                )
              }}
            </DatePicker.Context>
          </div>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker.Root>
  )
}
