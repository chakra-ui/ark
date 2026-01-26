<script setup lang="ts">
import { DatePicker, type DateValue } from '@ark-ui/vue/date-picker'
import { CalendarDate } from '@internationalized/date'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

const format = (date: DateValue) => date.year.toString()

const parse = (value: string | undefined) => {
  if (!value) return
  const fullRegex = /^(\d{4})$/
  const fullMatch = value.match(fullRegex)
  if (fullMatch) {
    const [_, year] = fullMatch.map(Number)
    return new CalendarDate(year, 1, 1)
  }
}
</script>

<template>
  <DatePicker.Root
    :format="format"
    :parse="parse"
    selection-mode="range"
    default-view="year"
    min-view="year"
    placeholder="yyyy"
    :class="styles.Root"
  >
    <DatePicker.Label :class="styles.Label">Label</DatePicker.Label>
    <DatePicker.Control :class="styles.Control">
      <DatePicker.Input :class="styles.Input" :index="0" />
      <DatePicker.Input :class="styles.Input" :index="1" />
      <DatePicker.Trigger :class="styles.Trigger">
        <CalendarIcon />
      </DatePicker.Trigger>
      <DatePicker.ClearTrigger :class="button.Root">Clear</DatePicker.ClearTrigger>
    </DatePicker.Control>
    <DatePicker.Positioner>
      <DatePicker.Content :class="styles.Content">
        <DatePicker.View view="year" :class="styles.View">
          <DatePicker.Context v-slot="api">
            <DatePicker.ViewControl :class="styles.ViewControl">
              <DatePicker.PrevTrigger :class="styles.PrevTrigger">
                <ChevronLeftIcon />
              </DatePicker.PrevTrigger>
              <span :class="styles.ViewTrigger">{{ api.getDecade().start }} - {{ api.getDecade().end }}</span>
              <DatePicker.NextTrigger :class="styles.NextTrigger">
                <ChevronRightIcon />
              </DatePicker.NextTrigger>
            </DatePicker.ViewControl>
            <DatePicker.Table :class="styles.Table">
              <DatePicker.TableBody :class="styles.TableBody">
                <DatePicker.TableRow
                  v-for="(years, id) in api.getYearsGrid({ columns: 4 })"
                  :key="id"
                  :class="styles.TableRow"
                >
                  <DatePicker.TableCell
                    v-for="(year, idx) in years"
                    :key="idx"
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
