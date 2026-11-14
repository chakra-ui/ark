import { DatePicker } from '@ark-ui/solid/date-picker'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { For, createMemo } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

export const MultipleMonths = () => {
  return (
    <DatePicker.Root class={styles.Root} numOfMonths={2}>
      <DatePicker.Label class={styles.Label}>Label</DatePicker.Label>
      <DatePicker.Control class={styles.Control}>
        <DatePicker.Input class={styles.Input} index={0} />
        <DatePicker.Trigger class={styles.Trigger}>
          <CalendarIcon />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger class={button.Root}>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content class={styles.Content}>
          <DatePicker.ViewControl class={styles.ViewControl}>
            <DatePicker.PrevTrigger class={styles.PrevTrigger}>
              <ChevronLeftIcon />
            </DatePicker.PrevTrigger>
            <DatePicker.RangeText />
            <DatePicker.NextTrigger class={styles.NextTrigger}>
              <ChevronRightIcon />
            </DatePicker.NextTrigger>
          </DatePicker.ViewControl>
          <div style={{ display: 'flex', gap: '10px' }}>
            <DatePicker.Context>
              {(datePicker) => (
                <DatePicker.Table class={styles.Table}>
                  <DatePicker.TableHead class={styles.TableHead}>
                    <DatePicker.TableRow class={styles.TableRow}>
                      <For each={datePicker().weekDays} keyed={false}>
                        {(weekDay) => (
                          <DatePicker.TableHeader class={styles.TableHeader}>{weekDay().short}</DatePicker.TableHeader>
                        )}
                      </For>
                    </DatePicker.TableRow>
                  </DatePicker.TableHead>
                  <DatePicker.TableBody class={styles.TableBody}>
                    <For each={datePicker().weeks} keyed={false}>
                      {(week) => (
                        <DatePicker.TableRow class={styles.TableRow}>
                          <For each={week()} keyed={false}>
                            {(day) => (
                              <DatePicker.TableCell class={styles.TableCell} value={day()}>
                                <DatePicker.TableCellTrigger class={styles.TableCellTrigger}>
                                  {day().day}
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            )}
                          </For>
                        </DatePicker.TableRow>
                      )}
                    </For>
                  </DatePicker.TableBody>
                </DatePicker.Table>
              )}
            </DatePicker.Context>
            <DatePicker.Context>
              {(datePicker) => {
                const offset = createMemo(() => datePicker().getOffset({ months: 1 }))
                return (
                  <DatePicker.Table class={styles.Table}>
                    <DatePicker.TableHead class={styles.TableHead}>
                      <DatePicker.TableRow class={styles.TableRow}>
                        <For each={datePicker().weekDays} keyed={false}>
                          {(weekDay) => (
                            <DatePicker.TableHeader class={styles.TableHeader}>
                              {weekDay().short}
                            </DatePicker.TableHeader>
                          )}
                        </For>
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>
                    <DatePicker.TableBody class={styles.TableBody}>
                      <For each={offset().weeks} keyed={false}>
                        {(week) => (
                          <DatePicker.TableRow class={styles.TableRow}>
                            <For each={week()} keyed={false}>
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
                            </For>
                          </DatePicker.TableRow>
                        )}
                      </For>
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
