import { DateInput, useDateInput } from '@ark-ui/react/date-input'
import { DatePicker, useDatePicker } from '@ark-ui/react/date-picker'
import { Portal } from '@ark-ui/react/portal'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import styles from 'styles/date-input.module.css'
import datePickerStyles from 'styles/date-picker.module.css'

export const WithDatePicker = () => {
  const datePicker = useDatePicker()
  const dateInput = useDateInput({
    value: datePicker.value,
    onValueChange(details) {
      datePicker.setValue(details.value)
    },
  })

  return (
    <DateInput.RootProvider className={styles.Root} value={dateInput}>
      <DateInput.Label className={styles.Label}>Date</DateInput.Label>
      <DateInput.Control className={styles.Control}>
        <DatePicker.RootProvider className={datePickerStyles.Root} value={datePicker}>
          <DatePicker.Control className={datePickerStyles.Control}>
            <DateInput.SegmentGroup className={styles.Input}>
              <DateInput.Context>
                {(dateInput) =>
                  dateInput
                    .getSegments()
                    .map((segment, index) => (
                      <DateInput.Segment
                        className={styles.Segment}
                        key={`${segment.type}-${index}`}
                        segment={segment}
                      />
                    ))
                }
              </DateInput.Context>
            </DateInput.SegmentGroup>
            <DatePicker.Trigger className={datePickerStyles.Trigger}>
              <CalendarIcon />
            </DatePicker.Trigger>
          </DatePicker.Control>
          <Portal>
            <DatePicker.Positioner>
              <DatePicker.Content className={datePickerStyles.Content}>
                <DatePicker.View view="day" className={datePickerStyles.View}>
                  <DatePicker.Context>
                    {(datePicker) => (
                      <>
                        <DatePicker.ViewControl className={datePickerStyles.ViewControl}>
                          <DatePicker.PrevTrigger className={datePickerStyles.PrevTrigger}>
                            <ChevronLeftIcon />
                          </DatePicker.PrevTrigger>
                          <DatePicker.ViewTrigger className={datePickerStyles.ViewTrigger}>
                            <DatePicker.RangeText />
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger className={datePickerStyles.NextTrigger}>
                            <ChevronRightIcon />
                          </DatePicker.NextTrigger>
                        </DatePicker.ViewControl>
                        <DatePicker.Table className={datePickerStyles.Table}>
                          <DatePicker.TableHead className={datePickerStyles.TableHead}>
                            <DatePicker.TableRow className={datePickerStyles.TableRow}>
                              {datePicker.weekDays.map((weekDay, id) => (
                                <DatePicker.TableHeader className={datePickerStyles.TableHeader} key={id}>
                                  {weekDay.short}
                                </DatePicker.TableHeader>
                              ))}
                            </DatePicker.TableRow>
                          </DatePicker.TableHead>
                          <DatePicker.TableBody className={datePickerStyles.TableBody}>
                            {datePicker.weeks.map((week, id) => (
                              <DatePicker.TableRow className={datePickerStyles.TableRow} key={id}>
                                {week.map((day, id) => (
                                  <DatePicker.TableCell className={datePickerStyles.TableCell} key={id} value={day}>
                                    <DatePicker.TableCellTrigger className={datePickerStyles.TableCellTrigger}>
                                      {day.day}
                                    </DatePicker.TableCellTrigger>
                                  </DatePicker.TableCell>
                                ))}
                              </DatePicker.TableRow>
                            ))}
                          </DatePicker.TableBody>
                        </DatePicker.Table>
                      </>
                    )}
                  </DatePicker.Context>
                </DatePicker.View>
                <DatePicker.View view="month" className={datePickerStyles.View}>
                  <DatePicker.Context>
                    {(datePicker) => (
                      <>
                        <DatePicker.ViewControl className={datePickerStyles.ViewControl}>
                          <DatePicker.PrevTrigger className={datePickerStyles.PrevTrigger}>
                            <ChevronLeftIcon />
                          </DatePicker.PrevTrigger>
                          <DatePicker.ViewTrigger className={datePickerStyles.ViewTrigger}>
                            <DatePicker.RangeText />
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger className={datePickerStyles.NextTrigger}>
                            <ChevronRightIcon />
                          </DatePicker.NextTrigger>
                        </DatePicker.ViewControl>
                        <DatePicker.Table className={datePickerStyles.Table}>
                          <DatePicker.TableBody className={datePickerStyles.TableBody}>
                            {datePicker.getMonthsGrid({ columns: 4, format: 'short' }).map((months, id) => (
                              <DatePicker.TableRow className={datePickerStyles.TableRow} key={id}>
                                {months.map((month, id) => (
                                  <DatePicker.TableCell
                                    className={datePickerStyles.TableCell}
                                    key={id}
                                    value={month.value}
                                  >
                                    <DatePicker.TableCellTrigger className={datePickerStyles.TableCellTrigger}>
                                      {month.label}
                                    </DatePicker.TableCellTrigger>
                                  </DatePicker.TableCell>
                                ))}
                              </DatePicker.TableRow>
                            ))}
                          </DatePicker.TableBody>
                        </DatePicker.Table>
                      </>
                    )}
                  </DatePicker.Context>
                </DatePicker.View>
                <DatePicker.View view="year" className={datePickerStyles.View}>
                  <DatePicker.Context>
                    {(datePicker) => (
                      <>
                        <DatePicker.ViewControl className={datePickerStyles.ViewControl}>
                          <DatePicker.PrevTrigger className={datePickerStyles.PrevTrigger}>
                            <ChevronLeftIcon />
                          </DatePicker.PrevTrigger>
                          <DatePicker.ViewTrigger className={datePickerStyles.ViewTrigger}>
                            <DatePicker.RangeText />
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger className={datePickerStyles.NextTrigger}>
                            <ChevronRightIcon />
                          </DatePicker.NextTrigger>
                        </DatePicker.ViewControl>
                        <DatePicker.Table className={datePickerStyles.Table}>
                          <DatePicker.TableBody className={datePickerStyles.TableBody}>
                            {datePicker.getYearsGrid({ columns: 4 }).map((years, id) => (
                              <DatePicker.TableRow className={datePickerStyles.TableRow} key={id}>
                                {years.map((year, id) => (
                                  <DatePicker.TableCell
                                    className={datePickerStyles.TableCell}
                                    key={id}
                                    value={year.value}
                                  >
                                    <DatePicker.TableCellTrigger className={datePickerStyles.TableCellTrigger}>
                                      {year.label}
                                    </DatePicker.TableCellTrigger>
                                  </DatePicker.TableCell>
                                ))}
                              </DatePicker.TableRow>
                            ))}
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
