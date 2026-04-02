<script setup lang="ts">
import { DateInput } from '@ark-ui/vue/date-input'
import styles from 'styles/date-input.module.css'
</script>

<template>
  <DateInput.Root granularity="second" :class="styles.Root">
    <DateInput.Label :class="styles.Label">Date &amp; Time</DateInput.Label>
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
