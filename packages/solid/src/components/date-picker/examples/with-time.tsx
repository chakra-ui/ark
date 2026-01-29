import { CalendarDateTime, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { DatePicker, type DatePickerValueChangeDetails } from '@ark-ui/solid/date-picker'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { Index, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
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
  const [value, setValue] = createSignal<CalendarDateTime[]>([new CalendarDateTime(2025, 1, 29, 14, 30)])

  const timeValue = () => {
    const v = value()[0]
    return v ? `${String(v.hour).padStart(2, '0')}:${String(v.minute).padStart(2, '0')}` : ''
  }

  const onTimeChange = (e: Event & { currentTarget: HTMLInputElement }) => {
    const [hours, minutes] = e.currentTarget.value.split(':').map(Number)
    setValue((prev) => {
      const current = prev[0] ?? new CalendarDateTime(2025, 1, 1, 0, 0)
      return [current.set({ hour: hours, minute: minutes })]
    })
  }

  const onDateChange = (details: DatePickerValueChangeDetails) => {
    const newDate = details.value[0]
    if (!newDate) return setValue([])
    const prevTime = value()[0] ?? { hour: 0, minute: 0 }
    setValue([new CalendarDateTime(newDate.year, newDate.month, newDate.day, prevTime.hour, prevTime.minute)])
  }

  return (
    <DatePicker.Root class={styles.Root} value={value()} onValueChange={onDateChange} closeOnSelect={false}>
      <DatePicker.Label class={styles.Label}>Date and time</DatePicker.Label>
      <DatePicker.Control class={styles.Control}>
        <DatePicker.Trigger class={button.Root} style={{ width: '100%', 'justify-content': 'space-between' }}>
          {value()[0] ? formatter.format(value()[0].toDate(getLocalTimeZone())) : 'Select date and time'}
          <CalendarIcon />
        </DatePicker.Trigger>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content class={styles.Content}>
            <DatePicker.View view="day" class={styles.View}>
              <DatePicker.Context>
                {(context) => (
                  <>
                    <DatePicker.ViewControl class={styles.ViewControl}>
                      <DatePicker.PrevTrigger class={styles.PrevTrigger}>
                        <ChevronLeftIcon />
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger class={styles.ViewTrigger}>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger class={styles.NextTrigger}>
                        <ChevronRightIcon />
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
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
                    <input type="time" value={timeValue()} onInput={onTimeChange} class={styles.TimeInput} />
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
