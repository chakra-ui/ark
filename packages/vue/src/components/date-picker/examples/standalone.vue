<script setup lang="ts">
import { DatePicker } from '../..'
</script>

<template>
  <DatePicker.Root open>
    <DatePicker.View view="day">
      <DatePicker.Context v-slot="api">
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
              <DatePicker.TableHeader v-for="(weekDay, id) in api.weekDays" :key="id">
                {{ weekDay.short }}
              </DatePicker.TableHeader>
            </DatePicker.TableRow>
          </DatePicker.TableHead>
          <DatePicker.TableBody>
            <DatePicker.TableRow v-for="(week, id) in api.weeks" :key="id">
              <DatePicker.TableCell v-for="(day, id) in week" :key="id" :value="day">
                <DatePicker.TableCellTrigger>{{ day.day }}</DatePicker.TableCellTrigger>
              </DatePicker.TableCell>
            </DatePicker.TableRow>
          </DatePicker.TableBody>
        </DatePicker.Table>
      </DatePicker.Context>
    </DatePicker.View>
    <DatePicker.View view="month">
      <DatePicker.Context v-slot="api">
        <DatePicker.ViewControl>
          <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
          <DatePicker.ViewTrigger>
            <DatePicker.RangeText />
          </DatePicker.ViewTrigger>
          <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
        </DatePicker.ViewControl>
        <DatePicker.Table>
          <DatePicker.TableBody>
            <DatePicker.TableRow
              v-for="(months, id) in api.getMonthsGrid({ columns: 4, format: 'short' })"
              :key="id"
            >
              <DatePicker.TableCell v-for="(month, id) in months" :key="id" :value="month.value">
                <DatePicker.TableCellTrigger>{{ month.label }}</DatePicker.TableCellTrigger>
              </DatePicker.TableCell>
            </DatePicker.TableRow>
          </DatePicker.TableBody>
        </DatePicker.Table>
      </DatePicker.Context>
    </DatePicker.View>
    <DatePicker.View view="year">
      <DatePicker.Context v-slot="api">
        <DatePicker.ViewControl>
          <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
          <DatePicker.ViewTrigger>
            <DatePicker.RangeText />
          </DatePicker.ViewTrigger>
          <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
        </DatePicker.ViewControl>
        <DatePicker.Table>
          <DatePicker.TableBody>
            <DatePicker.TableRow v-for="(years, id) in api.getYearsGrid({ columns: 4 })" :key="id">
              <DatePicker.TableCell v-for="(year, id) in years" :key="id" :value="year.value">
                <DatePicker.TableCellTrigger>{{ year.label }}</DatePicker.TableCellTrigger>
              </DatePicker.TableCell>
            </DatePicker.TableRow>
          </DatePicker.TableBody>
        </DatePicker.Table>
      </DatePicker.Context>
    </DatePicker.View>
  </DatePicker.Root>
</template>
