<script setup lang="ts">
import { DatePicker } from '@ark-ui/vue/date-picker'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import styles from 'styles/date-picker.module.css'
</script>

<template>
  <DatePicker.Root :class="styles.Root" openOnClick>
    <DatePicker.Label :class="styles.Label">Label</DatePicker.Label>
    <DatePicker.Control :class="styles.Control">
      <DatePicker.Input :class="styles.Input" />
    </DatePicker.Control>
    <DatePicker.Positioner>
      <DatePicker.Content :class="styles.Content">
        <DatePicker.View view="day" :class="styles.View">
          <DatePicker.Context v-slot="api">
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
            <DatePicker.Table :class="styles.Table">
              <DatePicker.TableHead :class="styles.TableHead">
                <DatePicker.TableRow :class="styles.TableRow">
                  <DatePicker.TableHeader v-for="(weekDay, id) in api.weekDays" :key="id" :class="styles.TableHeader">
                    {{ weekDay.short }}
                  </DatePicker.TableHeader>
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody :class="styles.TableBody">
                <DatePicker.TableRow v-for="(week, id) in api.weeks" :key="id" :class="styles.TableRow">
                  <DatePicker.TableCell v-for="(day, id) in week" :key="id" :value="day" :class="styles.TableCell">
                    <DatePicker.TableCellTrigger :class="styles.TableCellTrigger">
                      {{ day.day }}
                    </DatePicker.TableCellTrigger>
                  </DatePicker.TableCell>
                </DatePicker.TableRow>
              </DatePicker.TableBody>
            </DatePicker.Table>
          </DatePicker.Context>
        </DatePicker.View>
        <DatePicker.View view="month" :class="styles.View">
          <DatePicker.Context v-slot="api">
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
          <DatePicker.Context v-slot="api">
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
