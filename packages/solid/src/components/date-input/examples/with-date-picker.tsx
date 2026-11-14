import { DateInput, useDateInput } from '@ark-ui/solid/date-input'
import { DatePicker, useDatePicker } from '@ark-ui/solid/date-picker'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { For } from 'solid-js'
import { Portal } from '@solidjs/web'
import styles from 'styles/date-input.module.css'
import datePickerStyles from 'styles/date-picker.module.css'

export const WithDatePicker = () => {
  const datePicker = useDatePicker()
  const dateInput = useDateInput(() => ({
    value: datePicker().value,
    onValueChange(details) {
      datePicker().setValue(details.value)
    },
  }))

  return (
    <DateInput.RootProvider class={styles.Root} value={dateInput}>
      <DateInput.Label class={styles.Label}>Date</DateInput.Label>
      <DateInput.Control class={styles.Control}>
        <DatePicker.RootProvider class={datePickerStyles.Root} value={datePicker}>
          <DatePicker.Control class={datePickerStyles.Control}>
            <DateInput.SegmentGroup class={styles.SegmentGroup}>
              <DateInput.SegmentContext>
                {(segment) => <DateInput.Segment class={styles.Segment} segment={segment} />}
              </DateInput.SegmentContext>
            </DateInput.SegmentGroup>
            <DatePicker.Trigger class={datePickerStyles.Trigger}>
              <CalendarIcon />
            </DatePicker.Trigger>
          </DatePicker.Control>
          <Portal>
            <DatePicker.Positioner>
              <DatePicker.Content class={datePickerStyles.Content}>
                <DatePicker.View view="day" class={datePickerStyles.View}>
                  <DatePicker.Context>
                    {(datePicker) => (
                      <>
                        <DatePicker.ViewControl class={datePickerStyles.ViewControl}>
                          <DatePicker.PrevTrigger class={datePickerStyles.PrevTrigger}>
                            <ChevronLeftIcon />
                          </DatePicker.PrevTrigger>
                          <DatePicker.ViewTrigger class={datePickerStyles.ViewTrigger}>
                            <DatePicker.RangeText />
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger class={datePickerStyles.NextTrigger}>
                            <ChevronRightIcon />
                          </DatePicker.NextTrigger>
                        </DatePicker.ViewControl>
                        <DatePicker.Table class={datePickerStyles.Table}>
                          <DatePicker.TableHead class={datePickerStyles.TableHead}>
                            <DatePicker.TableRow class={datePickerStyles.TableRow}>
                              <For each={datePicker().weekDays} keyed={false}>
                                {(weekDay) => (
                                  <DatePicker.TableHeader class={datePickerStyles.TableHeader}>
                                    {weekDay().short}
                                  </DatePicker.TableHeader>
                                )}
                              </For>
                            </DatePicker.TableRow>
                          </DatePicker.TableHead>
                          <DatePicker.TableBody class={datePickerStyles.TableBody}>
                            <For each={datePicker().weeks} keyed={false}>
                              {(week) => (
                                <DatePicker.TableRow class={datePickerStyles.TableRow}>
                                  <For each={week()} keyed={false}>
                                    {(day) => (
                                      <DatePicker.TableCell class={datePickerStyles.TableCell} value={day()}>
                                        <DatePicker.TableCellTrigger class={datePickerStyles.TableCellTrigger}>
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
                      </>
                    )}
                  </DatePicker.Context>
                </DatePicker.View>
                <DatePicker.View view="month" class={datePickerStyles.View}>
                  <DatePicker.Context>
                    {(datePicker) => (
                      <>
                        <DatePicker.ViewControl class={datePickerStyles.ViewControl}>
                          <DatePicker.PrevTrigger class={datePickerStyles.PrevTrigger}>
                            <ChevronLeftIcon />
                          </DatePicker.PrevTrigger>
                          <DatePicker.ViewTrigger class={datePickerStyles.ViewTrigger}>
                            <DatePicker.RangeText />
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger class={datePickerStyles.NextTrigger}>
                            <ChevronRightIcon />
                          </DatePicker.NextTrigger>
                        </DatePicker.ViewControl>
                        <DatePicker.Table class={datePickerStyles.Table}>
                          <DatePicker.TableBody class={datePickerStyles.TableBody}>
                            <For each={datePicker().getMonthsGrid({ columns: 4, format: 'short' })} keyed={false}>
                              {(months) => (
                                <DatePicker.TableRow class={datePickerStyles.TableRow}>
                                  <For each={months()} keyed={false}>
                                    {(month) => (
                                      <DatePicker.TableCell class={datePickerStyles.TableCell} value={month().value}>
                                        <DatePicker.TableCellTrigger class={datePickerStyles.TableCellTrigger}>
                                          {month().label}
                                        </DatePicker.TableCellTrigger>
                                      </DatePicker.TableCell>
                                    )}
                                  </For>
                                </DatePicker.TableRow>
                              )}
                            </For>
                          </DatePicker.TableBody>
                        </DatePicker.Table>
                      </>
                    )}
                  </DatePicker.Context>
                </DatePicker.View>
                <DatePicker.View view="year" class={datePickerStyles.View}>
                  <DatePicker.Context>
                    {(datePicker) => (
                      <>
                        <DatePicker.ViewControl class={datePickerStyles.ViewControl}>
                          <DatePicker.PrevTrigger class={datePickerStyles.PrevTrigger}>
                            <ChevronLeftIcon />
                          </DatePicker.PrevTrigger>
                          <DatePicker.ViewTrigger class={datePickerStyles.ViewTrigger}>
                            <DatePicker.RangeText />
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger class={datePickerStyles.NextTrigger}>
                            <ChevronRightIcon />
                          </DatePicker.NextTrigger>
                        </DatePicker.ViewControl>
                        <DatePicker.Table class={datePickerStyles.Table}>
                          <DatePicker.TableBody class={datePickerStyles.TableBody}>
                            <For each={datePicker().getYearsGrid({ columns: 4 })} keyed={false}>
                              {(years) => (
                                <DatePicker.TableRow class={datePickerStyles.TableRow}>
                                  <For each={years()} keyed={false}>
                                    {(year) => (
                                      <DatePicker.TableCell class={datePickerStyles.TableCell} value={year().value}>
                                        <DatePicker.TableCellTrigger class={datePickerStyles.TableCellTrigger}>
                                          {year().label}
                                        </DatePicker.TableCellTrigger>
                                      </DatePicker.TableCell>
                                    )}
                                  </For>
                                </DatePicker.TableRow>
                              )}
                            </For>
                          </DatePicker.TableBody>
                        </DatePicker.Table>
                      </>
                    )}
                  </DatePicker.Context>
                </DatePicker.View>
              </DatePicker.Content>
            </DatePicker.Positioner>
          </Portal>
        </DatePicker.RootProvider>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.RootProvider>
  )
}
