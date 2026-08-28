<script setup lang="ts">
import { DateInput, useDateInput } from '@ark-ui/vue/date-input'
import { DatePicker, useDatePicker } from '@ark-ui/vue/date-picker'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import styles from 'styles/date-input.module.css'
import datePickerStyles from 'styles/date-picker.module.css'

const datePicker = useDatePicker()
const dateInput = useDateInput(
  computed(() => ({
    value: datePicker.value.value,
    onValueChange(details) {
      datePicker.value.setValue(details.value)
    },
  })),
)
</script>

<template>
  <DateInput.RootProvider :value="dateInput" :class="styles.Root">
    <DateInput.Label :class="styles.Label">Date</DateInput.Label>
    <DateInput.Control :class="styles.Control">
      <DatePicker.RootProvider :value="datePicker" :class="datePickerStyles.Root">
        <DatePicker.Control :class="datePickerStyles.Control">
          <DateInput.SegmentGroup :class="styles.SegmentGroup">
            <DateInput.SegmentContext v-slot="segment">
              <DateInput.Segment :class="styles.Segment" :segment="segment" />
            </DateInput.SegmentContext>
          </DateInput.SegmentGroup>
          <DatePicker.Trigger :class="datePickerStyles.Trigger">
            <CalendarIcon />
          </DatePicker.Trigger>
        </DatePicker.Control>
        <DatePicker.Positioner>
          <DatePicker.Content :class="datePickerStyles.Content">
            <DatePicker.View view="day" :class="datePickerStyles.View">
              <DatePicker.Context v-slot="api">
                <DatePicker.ViewControl :class="datePickerStyles.ViewControl">
                  <DatePicker.PrevTrigger :class="datePickerStyles.PrevTrigger">
                    <ChevronLeftIcon />
                  </DatePicker.PrevTrigger>
                  <DatePicker.ViewTrigger :class="datePickerStyles.ViewTrigger">
                    <DatePicker.RangeText />
                  </DatePicker.ViewTrigger>
                  <DatePicker.NextTrigger :class="datePickerStyles.NextTrigger">
                    <ChevronRightIcon />
                  </DatePicker.NextTrigger>
                </DatePicker.ViewControl>
                <DatePicker.Table :class="datePickerStyles.Table">
                  <DatePicker.TableHead :class="datePickerStyles.TableHead">
                    <DatePicker.TableRow :class="datePickerStyles.TableRow">
                      <DatePicker.TableHeader
                        v-for="(weekDay, id) in api.weekDays"
                        :key="id"
                        :class="datePickerStyles.TableHeader"
                      >
                        {{ weekDay.short }}
                      </DatePicker.TableHeader>
                    </DatePicker.TableRow>
                  </DatePicker.TableHead>
                  <DatePicker.TableBody :class="datePickerStyles.TableBody">
                    <DatePicker.TableRow v-for="(week, id) in api.weeks" :key="id" :class="datePickerStyles.TableRow">
                      <DatePicker.TableCell
                        v-for="(day, id) in week"
                        :key="id"
                        :value="day"
                        :class="datePickerStyles.TableCell"
                      >
                        <DatePicker.TableCellTrigger :class="datePickerStyles.TableCellTrigger">
                          {{ day.day }}
                        </DatePicker.TableCellTrigger>
                      </DatePicker.TableCell>
                    </DatePicker.TableRow>
                  </DatePicker.TableBody>
                </DatePicker.Table>
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="month" :class="datePickerStyles.View">
              <DatePicker.Context v-slot="api">
                <DatePicker.ViewControl :class="datePickerStyles.ViewControl">
                  <DatePicker.PrevTrigger :class="datePickerStyles.PrevTrigger">
                    <ChevronLeftIcon />
                  </DatePicker.PrevTrigger>
                  <DatePicker.ViewTrigger :class="datePickerStyles.ViewTrigger">
                    <DatePicker.RangeText />
                  </DatePicker.ViewTrigger>
                  <DatePicker.NextTrigger :class="datePickerStyles.NextTrigger">
                    <ChevronRightIcon />
                  </DatePicker.NextTrigger>
                </DatePicker.ViewControl>
                <DatePicker.Table :class="datePickerStyles.Table">
                  <DatePicker.TableBody :class="datePickerStyles.TableBody">
                    <DatePicker.TableRow
                      v-for="(months, id) in api.getMonthsGrid({ columns: 4, format: 'short' })"
                      :key="id"
                      :class="datePickerStyles.TableRow"
                    >
                      <DatePicker.TableCell
                        v-for="(month, id) in months"
                        :key="id"
                        :value="month.value"
                        :class="datePickerStyles.TableCell"
                      >
                        <DatePicker.TableCellTrigger :class="datePickerStyles.TableCellTrigger">
                          {{ month.label }}
                        </DatePicker.TableCellTrigger>
                      </DatePicker.TableCell>
                    </DatePicker.TableRow>
                  </DatePicker.TableBody>
                </DatePicker.Table>
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="year" :class="datePickerStyles.View">
              <DatePicker.Context v-slot="api">
                <DatePicker.ViewControl :class="datePickerStyles.ViewControl">
                  <DatePicker.PrevTrigger :class="datePickerStyles.PrevTrigger">
                    <ChevronLeftIcon />
                  </DatePicker.PrevTrigger>
                  <DatePicker.ViewTrigger :class="datePickerStyles.ViewTrigger">
                    <DatePicker.RangeText />
                  </DatePicker.ViewTrigger>
                  <DatePicker.NextTrigger :class="datePickerStyles.NextTrigger">
                    <ChevronRightIcon />
                  </DatePicker.NextTrigger>
                </DatePicker.ViewControl>
                <DatePicker.Table :class="datePickerStyles.Table">
                  <DatePicker.TableBody :class="datePickerStyles.TableBody">
                    <DatePicker.TableRow
                      v-for="(years, id) in api.getYearsGrid({ columns: 4 })"
                      :key="id"
                      :class="datePickerStyles.TableRow"
                    >
                      <DatePicker.TableCell
                        v-for="(year, id) in years"
                        :key="id"
                        :value="year.value"
                        :class="datePickerStyles.TableCell"
                      >
                        <DatePicker.TableCellTrigger :class="datePickerStyles.TableCellTrigger">
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
      </DatePicker.RootProvider>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.RootProvider>
</template>
