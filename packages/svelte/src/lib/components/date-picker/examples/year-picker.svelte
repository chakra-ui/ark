<script lang="ts">
  import { DatePicker, parseDate } from '@ark-ui/svelte/date-picker'
  import { Portal } from '@ark-ui/svelte/portal'
  import CalendarIcon from 'lucide-svelte/icons/calendar'
  import ChevronLeftIcon from 'lucide-svelte/icons/chevron-left'
  import ChevronRightIcon from 'lucide-svelte/icons/chevron-right'
  import button from 'styles/button.module.css'
  import styles from 'styles/date-picker.module.css'
  import type { DateValue } from '@internationalized/date'

  const format = (date: DateValue) => date.year.toString()

  const parse = (value: string | undefined) => {
    if (value === '' || !value) return
    const year = Number(value)
    if (year < 100) {
      const currentYear = new Date().getFullYear()
      const currentCentury = Math.floor(currentYear / 100) * 100
      return parseDate(new Date(currentCentury + year, 0))
    }
    return parseDate(new Date(Number(value), 0))
  }
</script>

<DatePicker.Root {format} {parse} defaultView="year" minView="year" placeholder="yyyy" class={styles.Root}>
  <DatePicker.Label class={styles.Label}>Label</DatePicker.Label>
  <DatePicker.Control class={styles.Control}>
    <DatePicker.Input class={styles.Input} />
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
