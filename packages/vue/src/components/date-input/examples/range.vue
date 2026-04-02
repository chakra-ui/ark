<script setup lang="ts">
import { DateInput } from '@ark-ui/vue/date-input'
import styles from 'styles/date-input.module.css'
</script>

<template>
  <DateInput.Root selection-mode="range" :class="styles.Root">
    <DateInput.Label :class="styles.Label">Date Range</DateInput.Label>
    <DateInput.Control :class="styles.Control">
      <DateInput.SegmentGroup :index="0" :class="styles.SegmentGroup">
        <DateInput.SegmentContext v-slot="segment">
          <DateInput.Segment :class="styles.Segment" :segment="segment" />
        </DateInput.SegmentContext>
      </DateInput.SegmentGroup>
      <span>→</span>
      <DateInput.SegmentGroup :index="1" :class="styles.SegmentGroup">
        <DateInput.SegmentContext v-slot="segment">
          <DateInput.Segment :class="styles.Segment" :segment="segment" />
        </DateInput.SegmentContext>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput :index="0" />
    <DateInput.HiddenInput :index="1" />
  </DateInput.Root>
</template>
