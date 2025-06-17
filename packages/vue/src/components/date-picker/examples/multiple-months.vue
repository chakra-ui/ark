<script setup lang="ts">
import { DatePicker } from '@ark-ui/vue/date-picker'
</script>

<template>
  <DatePicker.Root :numOfMonths="2">
    <DatePicker.Label>Label</DatePicker.Label>

    <DatePicker.Control>
      <DatePicker.Input :index="0" />
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
          <DatePicker.Context v-slot="datePicker">
            <DatePicker.Table>
              <DatePicker.TableHead>
                <DatePicker.TableRow>
                  <DatePicker.TableHeader v-for="(weekDay, id) in datePicker.weekDays" :key="id">
                    {{ weekDay.short }}
                  </DatePicker.TableHeader>
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody>
                <DatePicker.TableRow v-for="(week, id) in datePicker.weeks" :key="id">
                  <DatePicker.TableCell v-for="(day, id) in week" :key="id" :value="day">
                    <DatePicker.TableCellTrigger>{{ day.day }}</DatePicker.TableCellTrigger>
                  </DatePicker.TableCell>
                </DatePicker.TableRow>
              </DatePicker.TableBody>
            </DatePicker.Table>
          </DatePicker.Context>

          <!-- Second month -->
          <DatePicker.Context v-slot="datePicker">
            <DatePicker.Table>
              <DatePicker.TableHead>
                <DatePicker.TableRow>
                  <DatePicker.TableHeader v-for="(weekDay, id) in datePicker.weekDays" :key="id">
                    {{ weekDay.short }}
                  </DatePicker.TableHeader>
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody>
                <DatePicker.TableRow v-for="(week, id) in datePicker.getOffset({ months: 1 }).weeks" :key="id">
                  <DatePicker.TableCell
                    v-for="(day, id) in week"
                    :key="id"
                    :value="day"
                    :visibleRange="datePicker.getOffset({ months: 1 }).visibleRange"
                  >
                    <DatePicker.TableCellTrigger>{{ day.day }}</DatePicker.TableCellTrigger>
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
