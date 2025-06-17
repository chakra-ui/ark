<script>
  import { DatePicker } from '@ark-ui/svelte/date-picker'
</script>

<DatePicker.Root numOfMonths={2}>
  <DatePicker.Label>Label</DatePicker.Label>

  <DatePicker.Control>
    <DatePicker.Input index={0} />
    <DatePicker.Trigger>📅</DatePicker.Trigger>
    <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
  </DatePicker.Control>

  <DatePicker.Positioner>
    <DatePicker.Content>
      <DatePicker.YearSelect />
      <DatePicker.MonthSelect />
      <DatePicker.ViewControl>
        <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
        <DatePicker.RangeText />
        <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
      </DatePicker.ViewControl>

      <div style="display: flex; gap: 10px">
        <!-- First month -->
        <DatePicker.Context>
          {#snippet render(datePicker)}
            <DatePicker.Table>
              <DatePicker.TableHead>
                <DatePicker.TableRow>
                  {#each datePicker().weekDays as weekDay, id (id)}
                    <DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
                  {/each}
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody>
                {#each datePicker().weeks as week, id}
                  <DatePicker.TableRow>
                    {#each week as day, id (id)}
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

        <!-- Second month -->
        <DatePicker.Context>
          {#snippet render(datePicker)}
            {@const offset = datePicker().getOffset({ months: 1 })}
            <DatePicker.Table>
              <DatePicker.TableHead>
                <DatePicker.TableRow>
                  {#each datePicker().weekDays as weekDay, id (id)}
                    <DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
                  {/each}
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody>
                {#each offset.weeks as week, id (id)}
                  <DatePicker.TableRow>
                    {#each week as day, id (id)}
                      <DatePicker.TableCell value={day} visibleRange={offset.visibleRange}>
                        <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
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
