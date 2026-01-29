import { CalendarDateTime, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { DatePicker, type DatePickerValueChangeDetails } from '@ark-ui/react/date-picker'
import { Portal } from '@ark-ui/react/portal'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

const formatter = new DateFormatter('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

export const WithTime = () => {
  const [value, setValue] = useState<CalendarDateTime[]>([new CalendarDateTime(2025, 1, 29, 14, 30)])

  const timeValue = value[0]
    ? `${String(value[0].hour).padStart(2, '0')}:${String(value[0].minute).padStart(2, '0')}`
    : ''

  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.currentTarget.value.split(':').map(Number)
    setValue((prev) => {
      const current = prev[0] ?? new CalendarDateTime(2025, 1, 1, 0, 0)
      return [current.set({ hour: hours, minute: minutes })]
    })
  }

  const onDateChange = (details: DatePickerValueChangeDetails) => {
    const newDate = details.value[0]
    if (!newDate) return setValue([])
    const prevTime = value[0] ?? { hour: 0, minute: 0 }
    setValue([new CalendarDateTime(newDate.year, newDate.month, newDate.day, prevTime.hour, prevTime.minute)])
  }

  return (
    <DatePicker.Root className={styles.Root} value={value} onValueChange={onDateChange} closeOnSelect={false}>
      <DatePicker.Label className={styles.Label}>Date and time</DatePicker.Label>
      <DatePicker.Control className={styles.Control}>
        <DatePicker.Trigger className={button.Root} style={{ width: '100%', justifyContent: 'space-between' }}>
          {value[0] ? formatter.format(value[0].toDate(getLocalTimeZone())) : 'Select date and time'}
          <CalendarIcon />
        </DatePicker.Trigger>
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
                    <input type="time" value={timeValue} onChange={onTimeChange} className={styles.TimeInput} />
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
