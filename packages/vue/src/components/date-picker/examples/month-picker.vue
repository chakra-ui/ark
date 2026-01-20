<script setup lang="ts">
import { DatePicker, type DateValue } from '@ark-ui/vue/date-picker'
import { CalendarDate } from '@internationalized/date'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

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

<template>
  <DatePicker.Root
    :format="format"
    :parse="parse"
    default-view="month"
    min-view="month"
    placeholder="mm/yyyy"
    :class="styles.Root"
  >
    <DatePicker.Label :class="styles.Label">Label</DatePicker.Label>
    <DatePicker.Control :class="styles.Control">
      <DatePicker.Input :class="styles.Input" />
      <DatePicker.Trigger :class="styles.Trigger">
        <CalendarIcon />
      </DatePicker.Trigger>
      <DatePicker.ClearTrigger :class="button.Root">Clear</DatePicker.ClearTrigger>
    </DatePicker.Control>
    <DatePicker.Positioner>
      <DatePicker.Content :class="styles.Content">
        <DatePicker.View view="month" :class="styles.View">
          <DatePicker.ViewControl :class="styles.ViewControl">
            <DatePicker.PrevTrigger :class="styles.PrevTrigger">
              <ChevronLeftIcon />
            </DatePicker.PrevTrigger>
            <DatePicker.ViewTrigger :class="styles.ViewTrigger">
              <DatePicker.RangeText />
            </DatePicker.ViewTrigger>
            <DatePicker.NextTrigger :class="styles.NextTrigger">
              <ChevronRightIcon />
            </DatePicker.NextTrigger>
          </DatePicker.ViewControl>
          <DatePicker.Context v-slot="api">
            <DatePicker.Table :class="styles.Table">
              <DatePicker.TableBody :class="styles.TableBody">
                <DatePicker.TableRow
                  v-for="(months, id) in api.getMonthsGrid({ columns: 4, format: 'short' })"
                  :key="id"
                  :class="styles.TableRow"
                >
                  <DatePicker.TableCell
                    v-for="(month, id) in months"
                    :key="id"
                    :value="month.value"
                    :class="styles.TableCell"
                  >
                    <DatePicker.TableCellTrigger :class="styles.MonthTableCellTrigger">
                      {{ month.label }}
                    </DatePicker.TableCellTrigger>
                  </DatePicker.TableCell>
                </DatePicker.TableRow>
              </DatePicker.TableBody>
            </DatePicker.Table>
          </DatePicker.Context>
        </DatePicker.View>
        <DatePicker.View view="year" :class="styles.View">
          <DatePicker.ViewControl :class="styles.ViewControl">
            <DatePicker.PrevTrigger :class="styles.PrevTrigger">
              <ChevronLeftIcon />
            </DatePicker.PrevTrigger>
            <DatePicker.ViewTrigger :class="styles.ViewTrigger">
              <DatePicker.RangeText />
            </DatePicker.ViewTrigger>
            <DatePicker.NextTrigger :class="styles.NextTrigger">
              <ChevronRightIcon />
            </DatePicker.NextTrigger>
          </DatePicker.ViewControl>
          <DatePicker.Context v-slot="api">
            <DatePicker.Table :class="styles.Table">
              <DatePicker.TableBody :class="styles.TableBody">
                <DatePicker.TableRow
                  v-for="(years, id) in api.getYearsGrid({ columns: 4 })"
                  :key="id"
                  :class="styles.TableRow"
                >
                  <DatePicker.TableCell
                    v-for="(year, id) in years"
                    :key="id"
                    :value="year.value"
                    :class="styles.TableCell"
                  >
                    <DatePicker.TableCellTrigger :class="styles.YearTableCellTrigger">
                      {{ year.label }}
                    </DatePicker.TableCellTrigger>
                  </DatePicker.TableCell>
                </DatePicker.TableRow>
              </DatePicker.TableBody>
            </DatePicker.Table>
          </DatePicker.Context>
        </DatePicker.View>
      </DatePicker.Content>
    </DatePicker.Positioner>
  </DatePicker.Root>
</template>
