<script setup lang="ts">
import { DateInput, useDateInput } from '@ark-ui/vue/date-input'
import styles from 'styles/date-input.module.css'

const dateInput = useDateInput()
</script>

<template>
  <div class="stack">
    <DateInput.RootProvider :value="dateInput" :class="styles.Root">
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
    </DateInput.RootProvider>
  </div>
</template>
