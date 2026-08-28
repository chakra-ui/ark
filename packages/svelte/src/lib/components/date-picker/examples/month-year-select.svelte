<script lang="ts">
  import { DatePicker } from '@ark-ui/svelte/date-picker'
  import { Portal } from '@ark-ui/svelte/portal'
  import CalendarIcon from 'lucide-svelte/icons/calendar'
  import ChevronLeftIcon from 'lucide-svelte/icons/chevron-left'
  import ChevronRightIcon from 'lucide-svelte/icons/chevron-right'
  import styles from 'styles/date-picker.module.css'
</script>

<DatePicker.Root class={styles.Root}>
  <DatePicker.Label class={styles.Label}>Label</DatePicker.Label>
  <DatePicker.Control class={styles.Control}>
    <DatePicker.Input class={styles.Input} />
    <DatePicker.Trigger class={styles.Trigger}>
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
                <div class={styles.SelectGroup}>
                  <DatePicker.MonthSelect class={styles.MonthSelect} />
                  <DatePicker.YearSelect class={styles.YearSelect} />
                </div>
                <div class={styles.SelectGroup}>
                  <DatePicker.PrevTrigger class={styles.PrevTrigger}>
                    <ChevronLeftIcon />
                  </DatePicker.PrevTrigger>
                  <DatePicker.NextTrigger class={styles.NextTrigger}>
                    <ChevronRightIcon />
                  </DatePicker.NextTrigger>
                </div>
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
      </DatePicker.Content>
    </DatePicker.Positioner>
  </Portal>
</DatePicker.Root>
