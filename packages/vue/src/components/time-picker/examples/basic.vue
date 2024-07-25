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
            <TimePicker.Cell v-for="item in api.getHours()" :key="item.value" :value="item.value">
              {{ item.label }}
            </TimePicker.Cell>
            <TimePicker.Spacer />
          </TimePicker.Column>
          <TimePicker.Column unit="minute">
            <TimePicker.Spacer />
            <TimePicker.Cell v-for="item in api.getHours()" :key="item.value" :value="item.value">
              {{ item.label }}
            </TimePicker.Cell>
            <TimePicker.Spacer />
          </TimePicker.Column>
          <TimePicker.Column unit="second">
            <TimePicker.Spacer />
            <TimePicker.Cell v-for="item in api.getHours()" :key="item.value" :value="item.value">
              {{ item.label }}
            </TimePicker.Cell>
            <TimePicker.Spacer />
          </TimePicker.Column>
          <TimePicker.Column unit="period">
            <TimePicker.Cell value="am">AM</TimePicker.Cell>
            <TimePicker.Cell value="pm">PM</TimePicker.Cell>
          </TimePicker.Column>
        </TimePicker.Context>
      </TimePicker.Content>
    </TimePicker.Positioner>
  </TimePicker.Root>
</template>
