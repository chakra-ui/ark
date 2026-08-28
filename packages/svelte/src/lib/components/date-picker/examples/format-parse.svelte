<script lang="ts">
  import { DatePicker } from '@ark-ui/svelte/date-picker'
  import { Portal } from '@ark-ui/svelte/portal'
  import { CalendarDate, type DateValue } from '@internationalized/date'
  import CalendarIcon from 'lucide-svelte/icons/calendar'
  import ChevronLeftIcon from 'lucide-svelte/icons/chevron-left'
  import ChevronRightIcon from 'lucide-svelte/icons/chevron-right'
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
</script>

<DatePicker.Root class={styles.Root} {format} {parse} placeholder="dd/mm/yy">
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
            {/snippet}
          </DatePicker.Context>
        </DatePicker.View>
        <DatePicker.View view="month" class={styles.View}>
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
