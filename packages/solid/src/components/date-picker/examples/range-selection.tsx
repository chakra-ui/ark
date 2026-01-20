import { DatePicker } from '@ark-ui/solid/date-picker'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { Index, createMemo } from 'solid-js'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

export const RangeSelection = () => {
  return (
    <DatePicker.Root className={styles.Root} selectionMode="range">
      <DatePicker.Label className={styles.Label}>Label</DatePicker.Label>
      <DatePicker.Control className={styles.Control}>
        <DatePicker.Input className={styles.Input} index={0} />
        <DatePicker.Input className={styles.Input} index={1} />
        <DatePicker.Trigger className={styles.Trigger}>
          <CalendarIcon />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger className={button.Root}>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>
      <DatePicker.PresetTrigger className={styles.PresetTrigger} value="last7Days">
        Last 7 days
      </DatePicker.PresetTrigger>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content className={styles.Content}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <DatePicker.Context>
                {(context) => (
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
                )}
              </DatePicker.Context>
              <DatePicker.Context>
                {(context) => {
                  const offset = createMemo(() => context().getOffset({ months: 1 }))
                  return (
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
      </Portal>
    </DatePicker.Root>
  )
}
