<script setup lang="ts">
import { TimePicker, type TimePickerRootEmits, type TimePickerRootProps } from '../..'
import { useForwardPropsEmits } from '../../..'

const props = defineProps<TimePickerRootProps>()
const emits = defineEmits<TimePickerRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <TimePicker.Root v-bind="localProps">
    <TimePicker.Control>
      <TimePicker.Input />
      <TimePicker.Trigger>🗓</TimePicker.Trigger>
      <TimePicker.ClearTrigger>❌</TimePicker.ClearTrigger>
    </TimePicker.Control>
    <TimePicker.Positioner data-testid="positioner">
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
