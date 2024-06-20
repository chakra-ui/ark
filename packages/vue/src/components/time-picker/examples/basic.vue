<script setup lang="ts">
import { TimePicker } from '../..'
</script>

<template>
  <TimePicker.Root>
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
