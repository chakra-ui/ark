<script lang="ts">
  import { DatePicker } from '@ark-ui/svelte/date-picker'
</script>

<DatePicker.Root open>
  <DatePicker.Input />
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
  <DatePicker.View view="month">
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
          <DatePicker.TableBody>
            {#each datePicker().getMonthsGrid({ columns: 4, format: 'short' }) as months}
              <DatePicker.TableRow>
                {#each months as month}
                  <DatePicker.TableCell value={month.value}>
                    <DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
                  </DatePicker.TableCell>
                {/each}
              </DatePicker.TableRow>
            {/each}
          </DatePicker.TableBody>
        </DatePicker.Table>
      {/snippet}
    </DatePicker.Context>
  </DatePicker.View>
  <DatePicker.View view="year">
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
          <DatePicker.TableBody>
            {#each datePicker().getYearsGrid({ columns: 4 }) as years}
              <DatePicker.TableRow>
                {#each years as year}
                  <DatePicker.TableCell value={year.value}>
                    <DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
                  </DatePicker.TableCell>
                {/each}
              </DatePicker.TableRow>
            {/each}
          </DatePicker.TableBody>
        </DatePicker.Table>
      {/snippet}
    </DatePicker.Context>
  </DatePicker.View>
</DatePicker.Root>
