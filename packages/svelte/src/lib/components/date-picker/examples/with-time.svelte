<script lang="ts">
  import { CalendarDateTime, DateFormatter, getLocalTimeZone } from '@internationalized/date'
  import { DatePicker, type DatePickerValueChangeDetails } from '@ark-ui/svelte/date-picker'
  import { Portal } from '@ark-ui/svelte/portal'
  import CalendarIcon from 'lucide-svelte/icons/calendar'
  import ChevronLeftIcon from 'lucide-svelte/icons/chevron-left'
  import ChevronRightIcon from 'lucide-svelte/icons/chevron-right'
  import button from 'styles/button.module.css'
  import styles from 'styles/date-picker.module.css'

  const formatter = new DateFormatter('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  let value = $state<CalendarDateTime[]>([new CalendarDateTime(2025, 1, 29, 14, 30)])

  const timeValue = $derived(
    value[0] ? `${String(value[0].hour).padStart(2, '0')}:${String(value[0].minute).padStart(2, '0')}` : '',
  )

  const onTimeChange = (e: Event & { currentTarget: HTMLInputElement }) => {
    const [hours, minutes] = e.currentTarget.value.split(':').map(Number)
    const current = value[0] ?? new CalendarDateTime(2025, 1, 1, 0, 0)
    value = [current.set({ hour: hours, minute: minutes })]
  }

  const onDateChange = (details: DatePickerValueChangeDetails) => {
    const newDate = details.value[0]
    if (!newDate) {
      value = []
      return
    }
    const prevTime = value[0] ?? { hour: 0, minute: 0 }
    value = [new CalendarDateTime(newDate.year, newDate.month, newDate.day, prevTime.hour, prevTime.minute)]
  }
</script>

<DatePicker.Root class={styles.Root} {value} onValueChange={onDateChange} closeOnSelect={false}>
  <DatePicker.Label class={styles.Label}>Date and time</DatePicker.Label>
  <DatePicker.Control class={styles.Control}>
    <DatePicker.Trigger class={button.Root} style="width: 100%; justify-content: space-between">
      {value[0] ? formatter.format(value[0].toDate(getLocalTimeZone())) : 'Select date and time'}
      <CalendarIcon />
    </DatePicker.Trigger>
  </DatePicker.Control>
  <Portal>
    <DatePicker.Positioner>
      <DatePicker.Content class={styles.Content}>
        <DatePicker.View view="day" class={styles.View}>
          <DatePicker.Context>
            {#snippet render(datePicker)}
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
                    {#each datePicker().weekDays as weekDay}
                      <DatePicker.TableHeader class={styles.TableHeader}>{weekDay.short}</DatePicker.TableHeader>
                    {/each}
                  </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody class={styles.TableBody}>
                  {#each datePicker().weeks as week}
                    <DatePicker.TableRow class={styles.TableRow}>
                      {#each week as day}
                        <DatePicker.TableCell class={styles.TableCell} value={day}>
                          <DatePicker.TableCellTrigger class={styles.TableCellTrigger}>
                            {day.day}
                          </DatePicker.TableCellTrigger>
                        </DatePicker.TableCell>
                      {/each}
                    </DatePicker.TableRow>
                  {/each}
                </DatePicker.TableBody>
              </DatePicker.Table>
              <input type="time" value={timeValue} oninput={onTimeChange} class={styles.TimeInput} />
            {/snippet}
          </DatePicker.Context>
        </DatePicker.View>
      </DatePicker.Content>
    </DatePicker.Positioner>
  </Portal>
</DatePicker.Root>
