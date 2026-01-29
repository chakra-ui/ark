<script setup lang="ts">
import { CalendarDateTime, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { DatePicker, type DatePickerValueChangeDetails } from '@ark-ui/vue/date-picker'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/date-picker.module.css'

const formatter = new DateFormatter('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

const value = ref<CalendarDateTime[]>([new CalendarDateTime(2025, 1, 29, 14, 30)])

const timeValue = computed(() => {
  const v = value.value[0]
  return v ? `${String(v.hour).padStart(2, '0')}:${String(v.minute).padStart(2, '0')}` : ''
})

const formattedValue = computed(() => {
  const v = value.value[0]
  return v ? formatter.format(v.toDate(getLocalTimeZone())) : 'Select date and time'
})

const onTimeChange = (e: Event & { currentTarget: HTMLInputElement }) => {
  const [hours, minutes] = e.currentTarget.value.split(':').map(Number)
  const current = value.value[0] ?? new CalendarDateTime(2025, 1, 1, 0, 0)
  value.value = [current.set({ hour: hours, minute: minutes })]
}

const onDateChange = (details: DatePickerValueChangeDetails) => {
  const newDate = details.value[0]
  if (!newDate) {
    value.value = []
    return
  }
  const prevTime = value.value[0] ?? { hour: 0, minute: 0 }
  value.value = [new CalendarDateTime(newDate.year, newDate.month, newDate.day, prevTime.hour, prevTime.minute)]
}
</script>

<template>
  <DatePicker.Root :class="styles.Root" :value="value" :close-on-select="false" @value-change="onDateChange">
    <DatePicker.Label :class="styles.Label">Date and time</DatePicker.Label>
    <DatePicker.Control :class="styles.Control">
      <DatePicker.Trigger :class="button.Root" style="width: 100%; justify-content: space-between">
        {{ formattedValue }}
        <CalendarIcon />
      </DatePicker.Trigger>
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
            <input type="time" :value="timeValue" :class="styles.TimeInput" @input="onTimeChange" />
          </DatePicker.Context>
        </DatePicker.View>
      </DatePicker.Content>
    </DatePicker.Positioner>
  </DatePicker.Root>
</template>
