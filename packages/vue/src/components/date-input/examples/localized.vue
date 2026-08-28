<script setup lang="ts">
import { DateInput } from '@ark-ui/vue/date-input'
import { LocaleProvider } from '@ark-ui/vue/locale'
import styles from 'styles/date-input.module.css'
</script>

<template>
  <LocaleProvider locale="fr-FR">
    <DateInput.Root granularity="minute" :hour-cycle="24" :class="styles.Root">
      <DateInput.Label :class="styles.Label">Date et heure</DateInput.Label>
      <DateInput.Control :class="styles.Control">
        <DateInput.SegmentGroup :class="styles.SegmentGroup">
          <DateInput.SegmentContext v-slot="segment">
            <DateInput.Segment :class="styles.Segment" :segment="segment" />
          </DateInput.SegmentContext>
        </DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  </LocaleProvider>
</template>
