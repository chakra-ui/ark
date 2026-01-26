import { DatePicker } from '@ark-ui/react/date-picker'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
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
            <DatePicker.RangeText className={styles.RangeText} />
            <DatePicker.NextTrigger className={styles.NextTrigger}>
              <ChevronRightIcon />
            </DatePicker.NextTrigger>
          </DatePicker.ViewControl>
          <div className={styles.MultipleMonths}>
            <DatePicker.Context>
              {(datePicker) => (
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
              )}
            </DatePicker.Context>
            <DatePicker.Context>
              {(datePicker) => {
                const offset = datePicker.getOffset({ months: 1 })
                return (
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
                      {offset.weeks.map((week, id) => (
                        <DatePicker.TableRow className={styles.TableRow} key={id}>
                          {week.map((day, id) => (
                            <DatePicker.TableCell
                              className={styles.TableCell}
                              key={id}
                              value={day}
                              visibleRange={offset.visibleRange}
                            >
                              <DatePicker.TableCellTrigger className={styles.TableCellTrigger}>
                                {day.day}
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          ))}
                        </DatePicker.TableRow>
                      ))}
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
