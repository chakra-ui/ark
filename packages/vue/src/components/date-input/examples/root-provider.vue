<script setup lang="ts">
import { DateInput, useDateInput } from '@ark-ui/vue/date-input'
import styles from 'styles/date-input.module.css'

const dateInput = useDateInput()
</script>

<template>
  <DateInput.RootProvider :value="dateInput" :class="styles.Root">
    <output>{{ dateInput.valueAsString.length > 0 ? dateInput.valueAsString : 'N/A' }}</output>
    <DateInput.Label :class="styles.Label">Date</DateInput.Label>
    <DateInput.Control :class="styles.Control">
      <DateInput.SegmentGroup :class="styles.SegmentGroup">
        <DateInput.SegmentContext v-slot="segment">
          <DateInput.Segment :class="styles.Segment" :segment="segment" />
        </DateInput.SegmentContext>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.RootProvider>
</template>
