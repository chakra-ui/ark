<script lang="ts">
  import { DateInput, useDateInput } from '@ark-ui/svelte/date-input'
  import { DatePicker, useDatePicker } from '@ark-ui/svelte/date-picker'
  import { Portal } from '@ark-ui/svelte/portal'
  import CalendarIcon from 'lucide-svelte/icons/calendar'
  import ChevronLeftIcon from 'lucide-svelte/icons/chevron-left'
  import ChevronRightIcon from 'lucide-svelte/icons/chevron-right'
  import styles from 'styles/date-input.module.css'
  import datePickerStyles from 'styles/date-picker.module.css'

  const id = $props.id()
  const datePicker = useDatePicker({ id: `${id}-picker` })
  const dateInput = useDateInput(() => ({
    id,
    value: datePicker().value,
    onValueChange(details) {
      datePicker().setValue(details.value)
    },
  }))
</script>

<DateInput.RootProvider value={dateInput} class={styles.Root}>
  <DateInput.Label class={styles.Label}>Date</DateInput.Label>
  <DateInput.Control class={styles.Control}>
    <DatePicker.RootProvider value={datePicker} class={datePickerStyles.Root}>
      <DatePicker.Control class={datePickerStyles.Control}>
        <DateInput.SegmentGroup class={styles.SegmentGroup}>
          <DateInput.Context>
            {#snippet render(dateInput)}
              {#each dateInput().getSegments() as segment}
                <DateInput.Segment class={styles.Segment} {segment} />
              {/each}
            {/snippet}
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
                {#snippet render(datePicker)}
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
                        {#each datePicker().weekDays as weekDay}
                          <DatePicker.TableHeader class={datePickerStyles.TableHeader}>
                            {weekDay.short}
                          </DatePicker.TableHeader>
                        {/each}
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>
                    <DatePicker.TableBody class={datePickerStyles.TableBody}>
                      {#each datePicker().weeks as week}
                        <DatePicker.TableRow class={datePickerStyles.TableRow}>
                          {#each week as day}
                            <DatePicker.TableCell class={datePickerStyles.TableCell} value={day}>
                              <DatePicker.TableCellTrigger class={datePickerStyles.TableCellTrigger}>
                                {day.day}
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          {/each}
                        </DatePicker.TableRow>
                      {/each}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                {/snippet}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="month" class={datePickerStyles.View}>
              <DatePicker.Context>
                {#snippet render(datePicker)}
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
                      {#each datePicker().getMonthsGrid({ columns: 4, format: 'short' }) as months}
                        <DatePicker.TableRow class={datePickerStyles.TableRow}>
                          {#each months as month}
                            <DatePicker.TableCell class={datePickerStyles.TableCell} value={month.value}>
                              <DatePicker.TableCellTrigger class={datePickerStyles.TableCellTrigger}>
                                {month.label}
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          {/each}
                        </DatePicker.TableRow>
                      {/each}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                {/snippet}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="year" class={datePickerStyles.View}>
              <DatePicker.Context>
                {#snippet render(datePicker)}
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
                      {#each datePicker().getYearsGrid({ columns: 4 }) as years}
                        <DatePicker.TableRow class={datePickerStyles.TableRow}>
                          {#each years as year}
                            <DatePicker.TableCell class={datePickerStyles.TableCell} value={year.value}>
                              <DatePicker.TableCellTrigger class={datePickerStyles.TableCellTrigger}>
                                {year.label}
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          {/each}
                        </DatePicker.TableRow>
                      {/each}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                {/snippet}
              </DatePicker.Context>
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.RootProvider>
  </DateInput.Control>
  <DateInput.HiddenInput />
</DateInput.RootProvider>
