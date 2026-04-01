<script setup lang="ts">
import { DateInput } from '@ark-ui/vue/date-input'
import styles from 'styles/date-input.module.css'
</script>

<template>
  <DateInput.Root granularity="second" :class="styles.Root">
    <DateInput.Label :class="styles.Label">Date &amp; Time</DateInput.Label>
    <DateInput.Control :class="styles.Control">
      <DateInput.SegmentGroup :class="styles.SegmentGroup">
        <DateInput.Context v-slot="api">
          <DateInput.Segment
            v-for="(segment, index) in api.getSegments()"
            :class="styles.Segment"
            :key="`${segment.type}-${index}`"
            :segment="segment"
          />
        </DateInput.Context>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
</template>
