<script lang="ts">
  import { DatePicker } from '@ark-ui/svelte/date-picker'
  import { Portal } from '@ark-ui/svelte/portal'
</script>

<DatePicker.Root>
  <DatePicker.Label>Label</DatePicker.Label>
  <DatePicker.Control>
    <DatePicker.Input />
    <DatePicker.Trigger>📅</DatePicker.Trigger>
    <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
  </DatePicker.Control>
  <Portal>
    <DatePicker.Positioner>
      <DatePicker.Content>
        <DatePicker.YearSelect />
        <DatePicker.MonthSelect />
        <DatePicker.View view="day">
          <DatePicker.Context>
            {#snippet render(datePicker)}
              <DatePicker.ViewControl>
                <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger>
                  <DatePicker.RangeText />
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Table>
                <DatePicker.TableHead>
                  <DatePicker.TableRow>
                    {#each datePicker().weekDays as weekDay}
                      <DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
                    {/each}
                  </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody>
                  {#each datePicker().weeks as week}
                    <DatePicker.TableRow>
                      {#each week as day}
                        <DatePicker.TableCell value={day}>
                          <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
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
