<script setup lang="ts">
import { DateInput } from '@ark-ui/vue/date-input'
import styles from 'styles/date-input.module.css'
</script>

<template>
  <DateInput.Root selection-mode="range" :class="styles.Root">
    <DateInput.Label :class="styles.Label">Date Range</DateInput.Label>
    <DateInput.Control :class="styles.Control">
      <DateInput.SegmentGroup :index="0" :class="styles.Input">
        <DateInput.Context v-slot="api">
          <DateInput.Segment
            v-for="(segment, index) in api.getSegments()"
            :class="styles.Segment"
            :key="`${segment.type}-${index}`"
            :segment="segment"
          />
        </DateInput.Context>
      </DateInput.SegmentGroup>
      <span>→</span>
      <DateInput.SegmentGroup :index="1" :class="styles.Input">
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
    <DateInput.HiddenInput :index="0" />
    <DateInput.HiddenInput :index="1" />
  </DateInput.Root>
</template>
