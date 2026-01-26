<script setup lang="ts">
import { DatePicker } from '@ark-ui/vue/date-picker'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'
</script>

<template>
  <DatePicker.Root :numOfMonths="2" :class="styles.Root">
    <DatePicker.Label :class="styles.Label">Label</DatePicker.Label>

    <DatePicker.Control :class="styles.Control">
      <DatePicker.Input :index="0" :class="styles.Input" />
      <DatePicker.Trigger :class="styles.Trigger">
        <CalendarIcon />
      </DatePicker.Trigger>
      <DatePicker.ClearTrigger :class="button.Root">Clear</DatePicker.ClearTrigger>
    </DatePicker.Control>

    <DatePicker.Positioner>
      <DatePicker.Content :class="styles.Content">
        <DatePicker.ViewControl :class="styles.ViewControl">
          <DatePicker.PrevTrigger :class="styles.PrevTrigger">
            <ChevronLeftIcon />
          </DatePicker.PrevTrigger>
          <DatePicker.RangeText />
          <DatePicker.NextTrigger :class="styles.NextTrigger">
            <ChevronRightIcon />
          </DatePicker.NextTrigger>
        </DatePicker.ViewControl>

        <div style="display: flex; gap: 10px">
          <!-- First month -->
          <DatePicker.Context v-slot="datePicker">
            <DatePicker.Table :class="styles.Table">
              <DatePicker.TableHead :class="styles.TableHead">
                <DatePicker.TableRow :class="styles.TableRow">
                  <DatePicker.TableHeader
                    v-for="(weekDay, id) in datePicker.weekDays"
                    :key="id"
                    :class="styles.TableHeader"
                  >
                    {{ weekDay.short }}
                  </DatePicker.TableHeader>
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody :class="styles.TableBody">
                <DatePicker.TableRow v-for="(week, id) in datePicker.weeks" :key="id" :class="styles.TableRow">
                  <DatePicker.TableCell v-for="(day, id) in week" :key="id" :value="day" :class="styles.TableCell">
                    <DatePicker.TableCellTrigger :class="styles.TableCellTrigger">
                      {{ day.day }}
                    </DatePicker.TableCellTrigger>
                  </DatePicker.TableCell>
                </DatePicker.TableRow>
              </DatePicker.TableBody>
            </DatePicker.Table>
          </DatePicker.Context>

          <!-- Second month -->
          <DatePicker.Context v-slot="datePicker">
            <DatePicker.Table :class="styles.Table">
              <DatePicker.TableHead :class="styles.TableHead">
                <DatePicker.TableRow :class="styles.TableRow">
                  <DatePicker.TableHeader
                    v-for="(weekDay, id) in datePicker.weekDays"
                    :key="id"
                    :class="styles.TableHeader"
                  >
                    {{ weekDay.short }}
                  </DatePicker.TableHeader>
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody :class="styles.TableBody">
                <DatePicker.TableRow
                  v-for="(week, id) in datePicker.getOffset({ months: 1 }).weeks"
                  :key="id"
                  :class="styles.TableRow"
                >
                  <DatePicker.TableCell
                    v-for="(day, id) in week"
                    :key="id"
                    :value="day"
                    :visibleRange="datePicker.getOffset({ months: 1 }).visibleRange"
                    :class="styles.TableCell"
                  >
                    <DatePicker.TableCellTrigger :class="styles.TableCellTrigger">
                      {{ day.day }}
                    </DatePicker.TableCellTrigger>
                  </DatePicker.TableCell>
                </DatePicker.TableRow>
              </DatePicker.TableBody>
            </DatePicker.Table>
          </DatePicker.Context>
        </div>
      </DatePicker.Content>
    </DatePicker.Positioner>
  </DatePicker.Root>
</template>
