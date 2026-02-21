import { DatePicker } from '@ark-ui/react/date-picker'
import { Portal } from '@ark-ui/react/portal'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

export const FixedWeeks = () => {
  return (
    <DatePicker.Root className={styles.Root} fixedWeeks>
      <DatePicker.Label className={styles.Label}>Label</DatePicker.Label>
      <DatePicker.Control className={styles.Control}>
        <DatePicker.Input className={styles.Input} />
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
                {(datePicker) => (
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
                          {datePicker.weekDays.map((weekDay, id) => (
                            <DatePicker.TableHeader className={styles.TableHeader} key={id}>
                              {weekDay.short}
                            </DatePicker.TableHeader>
                          ))}
                        </DatePicker.TableRow>
                      </DatePicker.TableHead>
                      <DatePicker.TableBody className={styles.TableBody}>
                        {datePicker.weeks.map((week, id) => (
                          <DatePicker.TableRow className={styles.TableRow} key={id}>
                            {week.map((day, id) => (
                              <DatePicker.TableCell className={styles.TableCell} key={id} value={day}>
                                <DatePicker.TableCellTrigger className={styles.TableCellTrigger}>
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
            <DatePicker.View view="month" className={styles.View}>
              <DatePicker.Context>
                {(datePicker) => (
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
                        {datePicker.getMonthsGrid({ columns: 4, format: 'short' }).map((months, id) => (
                          <DatePicker.TableRow className={styles.TableRow} key={id}>
                            {months.map((month, id) => (
                              <DatePicker.TableCell className={styles.TableCell} key={id} value={month.value}>
                                <DatePicker.TableCellTrigger className={styles.TableCellTrigger}>
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
            <DatePicker.View view="year" className={styles.View}>
              <DatePicker.Context>
                {(datePicker) => (
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
                        {datePicker.getYearsGrid({ columns: 4 }).map((years, id) => (
                          <DatePicker.TableRow className={styles.TableRow} key={id}>
                            {years.map((year, id) => (
                              <DatePicker.TableCell className={styles.TableCell} key={id} value={year.value}>
                                <DatePicker.TableCellTrigger className={styles.TableCellTrigger}>
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
    </DatePicker.Root>
  )
}
