<script lang="ts">
  import { DatePicker } from '@ark-ui/svelte/date-picker'
  import { Portal } from '@ark-ui/svelte/portal'
  import ChevronLeftIcon from 'lucide-svelte/icons/chevron-left'
  import ChevronRightIcon from 'lucide-svelte/icons/chevron-right'
  import styles from 'styles/date-picker.module.css'
</script>

<DatePicker.Root openOnClick class={styles.Root}>
  <DatePicker.Label class={styles.Label}>Label</DatePicker.Label>
  <DatePicker.Control class={styles.Control}>
    <DatePicker.Input class={styles.Input} />
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
