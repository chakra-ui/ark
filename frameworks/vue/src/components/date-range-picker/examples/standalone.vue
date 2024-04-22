<script setup lang="ts">
import { DatePicker } from '../..'
</script>

<template>
  <DatePicker.Root open :num-of-months="2" selection-mode="range" :close-on-select="false">
    <DatePicker.Input :index="0" />
    <DatePicker.Input :index="1" />
    <DatePicker.View view="day" #default="api">
      <DatePicker.ViewControl>
        <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
        <DatePicker.ViewTrigger>
          <DatePicker.RangeText />
        </DatePicker.ViewTrigger>
        <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
      </DatePicker.ViewControl>
      <div style="display: flex; gap: 24px">
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
        <!-- 2nd month -->
        <DatePicker.Table>
          <DatePicker.TableHead>
            <DatePicker.TableRow>
              <DatePicker.TableHeader v-for="(weekDay, id) in api.weekDays" :key="id">
                {{ weekDay.short }}
              </DatePicker.TableHeader>
            </DatePicker.TableRow>
          </DatePicker.TableHead>
          <DatePicker.TableBody>
            <DatePicker.TableRow v-for="(week, id) in api.getOffset({ months: 1 }).weeks" :key="id">
              <DatePicker.TableCell
                v-for="(day, id) in week"
                :key="id"
                :value="day"
                :visibleRange="api.getOffset({ months: 1 }).visibleRange"
              >
                <DatePicker.TableCellTrigger>{{ day.day }}</DatePicker.TableCellTrigger>
              </DatePicker.TableCell>
            </DatePicker.TableRow>
          </DatePicker.TableBody>
        </DatePicker.Table>
      </div>
    </DatePicker.View>
    <DatePicker.View view="month" #default="api">
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
    </DatePicker.View>
    <DatePicker.View view="year" #default="api">
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
    </DatePicker.View>
  </DatePicker.Root>
</template>
