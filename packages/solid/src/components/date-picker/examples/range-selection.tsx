import { DatePicker } from '@ark-ui/solid/date-picker'
import { CalendarIcon } from 'lucide-solid'
import { Index, createMemo } from 'solid-js'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

export const RangeSelection = () => {
  return (
    <DatePicker.Root class={styles.Root} selectionMode="range">
      <DatePicker.Label class={styles.Label}>Label</DatePicker.Label>
      <DatePicker.Control class={styles.Control}>
        <DatePicker.Input class={styles.Input} index={0} />
        <DatePicker.Input class={styles.Input} index={1} />
        <DatePicker.Trigger class={styles.Trigger}>
          <CalendarIcon />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger class={button.Root}>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>
      <DatePicker.PresetTrigger class={styles.PresetTrigger} value="last7Days">
        Last 7 days
      </DatePicker.PresetTrigger>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content class={styles.Content}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <DatePicker.Context>
                {(context) => (
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
                )}
              </DatePicker.Context>
              <DatePicker.Context>
                {(context) => {
                  const offset = createMemo(() => context().getOffset({ months: 1 }))
                  return (
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
                        <Index each={offset().weeks}>
                          {(week) => (
                            <DatePicker.TableRow class={styles.TableRow}>
                              <Index each={week()}>
                                {(day) => (
                                  <DatePicker.TableCell
                                    class={styles.TableCell}
                                    value={day()}
                                    visibleRange={offset().visibleRange}
                                  >
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
