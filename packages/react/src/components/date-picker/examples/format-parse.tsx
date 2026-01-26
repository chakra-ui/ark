import { DatePicker } from '@ark-ui/react/date-picker'
import { Portal } from '@ark-ui/react/portal'
import { CalendarDate, type DateValue } from '@internationalized/date'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

const parse = (value: string) => {
  const fullRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/
  const fullMatch = value.match(fullRegex)
  if (fullMatch) {
    const [_, day, month, year] = fullMatch.map(Number)
    try {
      return new CalendarDate(year + 2000, month, day)
    } catch {
      return undefined
    }
  }

  const partialRegex = /^(\d{1,2})\/(\d{1,2})$/
  const partialMatch = value.match(partialRegex)
  if (partialMatch) {
    const [_, day, month] = partialMatch.map(Number)
    const currentYear = new Date().getFullYear()
    try {
      return new CalendarDate(currentYear, month, day)
    } catch {
      return undefined
    }
  }

  const dayRegex = /^(\d{1,2})$/
  const dayMatch = value.match(dayRegex)
  if (dayMatch) {
    const [_, day] = dayMatch.map(Number)
    const currentYear = new Date().getFullYear()
    return new CalendarDate(currentYear, 1, day)
  }

  return undefined
}

const format = (date: DateValue) => {
  const day = date.day.toString().padStart(2, '0')
  const month = date.month.toString().padStart(2, '0')
  const year = (date.year % 100).toString().padStart(2, '0')
  return `${day}/${month}/${year}`
}

export const FormatParse = () => {
  return (
    <DatePicker.Root className={styles.Root} format={format} parse={parse} placeholder="dd/mm/yy">
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
