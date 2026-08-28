<script lang="ts">
  import { DatePicker } from '@ark-ui/svelte/date-picker'
  import CalendarIcon from 'lucide-svelte/icons/calendar'
  import ChevronLeftIcon from 'lucide-svelte/icons/chevron-left'
  import ChevronRightIcon from 'lucide-svelte/icons/chevron-right'
  import button from 'styles/button.module.css'
  import styles from 'styles/date-picker.module.css'
</script>

<DatePicker.Root numOfMonths={2} class={styles.Root}>
  <DatePicker.Label class={styles.Label}>Label</DatePicker.Label>

  <DatePicker.Control class={styles.Control}>
    <DatePicker.Input class={styles.Input} index={0} />
    <DatePicker.Trigger class={styles.Trigger}>
      <CalendarIcon />
    </DatePicker.Trigger>
    <DatePicker.ClearTrigger class={button.Root}>Clear</DatePicker.ClearTrigger>
  </DatePicker.Control>

  <DatePicker.Positioner>
    <DatePicker.Content class={styles.Content}>
      <DatePicker.ViewControl class={styles.ViewControl}>
        <DatePicker.PrevTrigger class={styles.PrevTrigger}>
          <ChevronLeftIcon />
        </DatePicker.PrevTrigger>
        <DatePicker.RangeText />
        <DatePicker.NextTrigger class={styles.NextTrigger}>
          <ChevronRightIcon />
        </DatePicker.NextTrigger>
      </DatePicker.ViewControl>

      <div style="display: flex; gap: 10px">
        <DatePicker.Context>
          {#snippet render(datePicker)}
            <DatePicker.Table class={styles.Table}>
              <DatePicker.TableHead class={styles.TableHead}>
                <DatePicker.TableRow class={styles.TableRow}>
                  {#each datePicker().weekDays as weekDay, id (id)}
                    <DatePicker.TableHeader class={styles.TableHeader}>{weekDay.short}</DatePicker.TableHeader>
                  {/each}
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody class={styles.TableBody}>
                {#each datePicker().weeks as week, id}
                  <DatePicker.TableRow class={styles.TableRow}>
                    {#each week as day, id (id)}
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

        <DatePicker.Context>
          {#snippet render(datePicker)}
            {@const offset = datePicker().getOffset({ months: 1 })}
            <DatePicker.Table class={styles.Table}>
              <DatePicker.TableHead class={styles.TableHead}>
                <DatePicker.TableRow class={styles.TableRow}>
                  {#each datePicker().weekDays as weekDay, id (id)}
                    <DatePicker.TableHeader class={styles.TableHeader}>{weekDay.short}</DatePicker.TableHeader>
                  {/each}
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody class={styles.TableBody}>
                {#each offset.weeks as week, id (id)}
                  <DatePicker.TableRow class={styles.TableRow}>
                    {#each week as day, id (id)}
                      <DatePicker.TableCell class={styles.TableCell} value={day} visibleRange={offset.visibleRange}>
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
      </div>
    </DatePicker.Content>
  </DatePicker.Positioner>
</DatePicker.Root>
