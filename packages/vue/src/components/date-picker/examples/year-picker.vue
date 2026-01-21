<script setup lang="ts">
import { DatePicker, parseDate, type DateValue } from '@ark-ui/vue/date-picker'
import { CalendarIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

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

<template>
  <DatePicker.Root
    :format="format"
    :parse="parse"
    default-view="year"
    min-view="year"
    placeholder="yyyy"
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
        <DatePicker.View view="year" :class="styles.View">
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
