<script lang="ts">
  import { DatePicker } from '@ark-ui/svelte/date-picker'
  import { Portal } from '@ark-ui/svelte/portal'
  import CalendarIcon from 'lucide-svelte/icons/calendar'
  import ChevronLeftIcon from 'lucide-svelte/icons/chevron-left'
  import ChevronRightIcon from 'lucide-svelte/icons/chevron-right'
  import button from 'styles/button.module.css'
  import styles from 'styles/date-picker.module.css'
  import { CalendarDate, type DateValue } from '@internationalized/date'

  const format = (date: DateValue) => {
    const month = date.month.toString().padStart(2, '0')
    const year = date.year.toString()
    return `${month}/${year}`
  }

  const parse = (value: string) => {
    const fullRegex = /^(\d{1,2})\/(\d{4})$/
    const fullMatch = value.match(fullRegex)
    if (fullMatch) {
      const [_, month, year] = fullMatch.map(Number)
      return new CalendarDate(year, month, 1)
    }
  }
</script>

<DatePicker.Root {format} {parse} defaultView="month" minView="month" placeholder="mm/yyyy" class={styles.Root}>
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
        <DatePicker.View view="month" class={styles.View}>
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
          <DatePicker.Context>
            {#snippet render(datePicker)}
              <DatePicker.Table class={styles.Table}>
                <DatePicker.TableBody class={styles.TableBody}>
                  {#each datePicker().getMonthsGrid({ columns: 4, format: 'short' }) as months}
                    <DatePicker.TableRow class={styles.TableRow}>
                      {#each months as month}
                        <DatePicker.TableCell class={styles.TableCell} value={month.value}>
                          <DatePicker.TableCellTrigger class={styles.MonthTableCellTrigger}>
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
        <DatePicker.View view="year" class={styles.View}>
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
