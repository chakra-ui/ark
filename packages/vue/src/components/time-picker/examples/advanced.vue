<script setup lang="ts">
import { Time } from '@internationalized/date'
import { TimePicker } from '../..'
</script>

<template>
  <TimePicker.Root
    allowSeconds
    :steps="{
      hour: 2,
      minute: 5,
      second: 10,
    }"
    :min="new Time(4, 20, 30)"
    :max="new Time(20, 10, 10)"
  >
    <TimePicker.Control>
      <TimePicker.Input />
      <TimePicker.Trigger>🗓</TimePicker.Trigger>
      <TimePicker.ClearTrigger>❌</TimePicker.ClearTrigger>
    </TimePicker.Control>
    <TimePicker.Positioner>
      <TimePicker.Content>
        <TimePicker.Context v-slot="api">
          <TimePicker.Column unit="hour">
            <TimePicker.Spacer />
            <TimePicker.HourCell
              v-for="item in api.getHours()"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </TimePicker.HourCell>
            <TimePicker.Spacer />
          </TimePicker.Column>
          <TimePicker.Column unit="minute">
            <TimePicker.Spacer />
            <TimePicker.MinuteCell
              v-for="item in api.getHours()"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </TimePicker.MinuteCell>
            <TimePicker.Spacer />
          </TimePicker.Column>
          <TimePicker.Column unit="second">
            <TimePicker.Spacer />
            <TimePicker.SecondCell
              v-for="item in api.getHours()"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </TimePicker.SecondCell>
            <TimePicker.Spacer />
          </TimePicker.Column>
          <TimePicker.Column unit="period">
            <TimePicker.PeriodCell value="am">AM</TimePicker.PeriodCell>
            <TimePicker.PeriodCell value="pm">PM</TimePicker.PeriodCell>
          </TimePicker.Column>
        </TimePicker.Context>
      </TimePicker.Content>
    </TimePicker.Positioner>
  </TimePicker.Root>
</template>
