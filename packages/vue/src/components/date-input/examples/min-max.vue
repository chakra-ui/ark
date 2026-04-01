<script setup lang="ts">
import { DateInput } from '@ark-ui/vue/date-input'
import { parseDate } from '@internationalized/date'
import styles from 'styles/date-input.module.css'
</script>

<template>
  <DateInput.Root :min="parseDate('2024-01-01')" :max="parseDate('2024-12-31')" :class="styles.Root">
    <DateInput.Label :class="styles.Label">Date (2024 only)</DateInput.Label>
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
