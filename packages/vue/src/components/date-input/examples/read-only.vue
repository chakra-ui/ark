<script setup lang="ts">
import { DateInput } from '@ark-ui/vue/date-input'
import { parseDate } from '@internationalized/date'
import styles from 'styles/date-input.module.css'
</script>

<template>
  <DateInput.Root read-only :default-value="[parseDate('2024-06-15')]" :class="styles.Root">
    <DateInput.Label :class="styles.Label">Date</DateInput.Label>
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
