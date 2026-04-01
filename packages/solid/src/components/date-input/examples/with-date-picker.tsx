import { DateInput, useDateInput } from '@ark-ui/solid/date-input'
import { DatePicker, useDatePicker } from '@ark-ui/solid/date-picker'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import { Portal } from 'solid-js/web'
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
              <DateInput.Context>
                {(dateInput) => (
                  <Index each={dateInput().getSegments()}>
                    {(segment) => <DateInput.Segment class={styles.Segment} segment={segment()} />}
                  </Index>
                )}
              </DateInput.Context>
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
                              <Index each={datePicker().weekDays}>
                                {(weekDay) => (
                                  <DatePicker.TableHeader class={datePickerStyles.TableHeader}>
                                    {weekDay().short}
                                  </DatePicker.TableHeader>
                                )}
                              </Index>
                            </DatePicker.TableRow>
                          </DatePicker.TableHead>
                          <DatePicker.TableBody class={datePickerStyles.TableBody}>
                            <Index each={datePicker().weeks}>
                              {(week) => (
                                <DatePicker.TableRow class={datePickerStyles.TableRow}>
                                  <Index each={week()}>
                                    {(day) => (
                                      <DatePicker.TableCell class={datePickerStyles.TableCell} value={day()}>
                                        <DatePicker.TableCellTrigger class={datePickerStyles.TableCellTrigger}>
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
                            <Index each={datePicker().getMonthsGrid({ columns: 4, format: 'short' })}>
                              {(months) => (
                                <DatePicker.TableRow class={datePickerStyles.TableRow}>
                                  <Index each={months()}>
                                    {(month) => (
                                      <DatePicker.TableCell class={datePickerStyles.TableCell} value={month().value}>
                                        <DatePicker.TableCellTrigger class={datePickerStyles.TableCellTrigger}>
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
                            <Index each={datePicker().getYearsGrid({ columns: 4 })}>
                              {(years) => (
                                <DatePicker.TableRow class={datePickerStyles.TableRow}>
                                  <Index each={years()}>
                                    {(year) => (
                                      <DatePicker.TableCell class={datePickerStyles.TableCell} value={year().value}>
                                        <DatePicker.TableCellTrigger class={datePickerStyles.TableCellTrigger}>
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
        </DatePicker.RootProvider>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.RootProvider>
  )
}
