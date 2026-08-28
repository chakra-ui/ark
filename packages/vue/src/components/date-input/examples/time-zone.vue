<script setup lang="ts">
import { DateInput } from '@ark-ui/vue/date-input'
import { parseZonedDateTime } from '@internationalized/date'
import { ref } from 'vue'
import styles from 'styles/date-input.module.css'

const hideTimeZone = ref(false)
</script>

<template>
  <div class="stack">
    <label :class="styles.CheckboxLabel">
      <input v-model="hideTimeZone" :class="styles.Checkbox" type="checkbox" />
      Hide time zone
    </label>
    <DateInput.Root
      :class="styles.Root"
      :default-value="[parseZonedDateTime('2025-02-03T08:45:00[America/Los_Angeles]')]"
      granularity="minute"
      :hide-time-zone="hideTimeZone"
    >
      <DateInput.Label :class="styles.Label">Meeting time</DateInput.Label>
      <DateInput.Control :class="styles.Control">
        <DateInput.SegmentGroup :class="styles.SegmentGroup">
          <DateInput.SegmentContext v-slot="segment">
            <DateInput.Segment :class="styles.Segment" :segment="segment" />
          </DateInput.SegmentContext>
        </DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  </div>
</template>
