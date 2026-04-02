<script setup lang="ts">
import { DateInput, useDateInput } from '@ark-ui/vue/date-input'
import { XIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/date-input.module.css'

const dateInput = useDateInput()
</script>

<template>
  <DateInput.RootProvider :value="dateInput" :class="styles.Root">
    <DateInput.Label :class="styles.Label">Date</DateInput.Label>
    <DateInput.Control :class="styles.Control">
      <DateInput.SegmentGroup :class="styles.SegmentGroup">
        <DateInput.SegmentContext v-slot="segment">
          <DateInput.Segment :class="styles.Segment" :segment="segment" />
        </DateInput.SegmentContext>
      </DateInput.SegmentGroup>
      <button aria-label="Clear date" :class="button.Root" type="button" @click="dateInput.clearValue()">
        <XIcon />
      </button>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.RootProvider>
</template>
