<script lang="ts">
  import { DatePicker } from '@ark-ui/svelte/date-picker'
  import { Portal } from '@ark-ui/svelte/portal'
  import { CalendarDate, type DateValue } from '@internationalized/date'
  import CalendarIcon from 'lucide-svelte/icons/calendar'
  import ChevronLeftIcon from 'lucide-svelte/icons/chevron-left'
  import ChevronRightIcon from 'lucide-svelte/icons/chevron-right'
  import button from 'styles/button.module.css'
  import styles from 'styles/date-picker.module.css'

  const format = (date: DateValue) => date.year.toString()

  const parse = (value: string | undefined) => {
    if (!value) return
    const fullRegex = /^(\d{4})$/
    const fullMatch = value.match(fullRegex)
    if (fullMatch) {
      const [_, year] = fullMatch.map(Number)
      return new CalendarDate(year, 1, 1)
    }
  }
</script>

<DatePicker.Root
  {format}
  {parse}
  selectionMode="range"
  defaultView="year"
  minView="year"
  placeholder="yyyy"
  class={styles.Root}
>
  <DatePicker.Label class={styles.Label}>Label</DatePicker.Label>
  <DatePicker.Control class={styles.Control}>
    <DatePicker.Input class={styles.Input} index={0} />
    <DatePicker.Input class={styles.Input} index={1} />
    <DatePicker.Trigger class={styles.Trigger}>
      <CalendarIcon />
    </DatePicker.Trigger>
    <DatePicker.ClearTrigger class={button.Root}>Clear</DatePicker.ClearTrigger>
  </DatePicker.Control>
  <Portal>
    <DatePicker.Positioner>
      <DatePicker.Content class={styles.Content}>
        <DatePicker.View view="year" class={styles.View}>
          <DatePicker.Context>
            {#snippet render(datePicker)}
              <DatePicker.ViewControl class={styles.ViewControl}>
                <DatePicker.PrevTrigger class={styles.PrevTrigger}>
                  <ChevronLeftIcon />
                </DatePicker.PrevTrigger>
                <span class={styles.ViewTrigger}>
                  {datePicker().getDecade().start} - {datePicker().getDecade().end}
                </span>
                <DatePicker.NextTrigger class={styles.NextTrigger}>
                  <ChevronRightIcon />
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Table class={styles.Table}>
                <DatePicker.TableBody class={styles.TableBody}>
                  {#each datePicker().getYearsGrid({ columns: 4 }) as years}
                    <DatePicker.TableRow class={styles.TableRow}>
                      {#each years as year}
                        <DatePicker.TableCell class={styles.TableCell} value={year.value}>
                          <DatePicker.TableCellTrigger class={styles.YearTableCellTrigger}>
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
</DatePicker.Root>
