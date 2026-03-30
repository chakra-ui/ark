<script setup lang="ts">
import { DateInput, parseDate } from '@ark-ui/vue/date-input'
import type { DateValue } from '@ark-ui/vue/date-input'
import { type Ref, ref } from 'vue'
import styles from 'styles/date-input.module.css'

const value = ref([parseDate('2024-06-15')]) as Ref<DateValue[]>
</script>

<template>
  <DateInput.Root v-model="value" :class="styles.Root">
    <DateInput.Label :class="styles.Label">Date</DateInput.Label>
    <DateInput.Control :class="styles.Control">
      <DateInput.SegmentGroup :class="styles.Input">
        <DateInput.Context v-slot="api">
          <DateInput.Segment
            v-for="(segment, index) in api.getSegments()"
            :key="`${segment.type}-${index}`"
            :segment="segment"
          />
        </DateInput.Context>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
</template>
