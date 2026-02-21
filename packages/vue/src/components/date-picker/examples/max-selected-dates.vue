<script setup lang="ts">
import { DatePicker } from '@ark-ui/vue/date-picker'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import styles from 'styles/date-picker.module.css'
</script>

<template>
  <DatePicker.Root selection-mode="multiple" :max-selected-dates="3" inline :class="styles.Root">
    <DatePicker.View view="day" :class="styles.View">
      <DatePicker.Context v-slot="api">
        <DatePicker.ViewControl :class="styles.ViewControl">
          <DatePicker.PrevTrigger :class="styles.PrevTrigger">
            <ChevronLeftIcon />
          </DatePicker.PrevTrigger>
          <DatePicker.RangeText />
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
  </DatePicker.Root>
</template>
