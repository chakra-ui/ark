<script setup lang="ts">
import { DateInput } from '@ark-ui/vue/date-input'
import { DateFormatter } from '@internationalized/date'
import styles from 'styles/date-input.module.css'

const timeFormatter = new DateFormatter('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})
</script>

<template>
  <DateInput.Root :class="styles.Root" granularity="minute" :hour-cycle="24" :formatter="timeFormatter">
    <DateInput.Label :class="styles.Label">Time</DateInput.Label>
    <DateInput.Control :class="styles.Control">
      <DateInput.SegmentGroup :class="styles.SegmentGroup">
        <DateInput.SegmentContext v-slot="segment">
          <DateInput.Segment :class="styles.Segment" :segment="segment" />
        </DateInput.SegmentContext>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
</template>
