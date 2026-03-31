<script setup lang="ts">
import { DateInput } from '@ark-ui/vue/date-input'
import styles from 'styles/date-input.module.css'
</script>

<template>
  <DateInput.Root locale="fr-FR" granularity="minute" :hour-cycle="24" :class="styles.Root">
    <DateInput.Label :class="styles.Label">Date et heure</DateInput.Label>
    <DateInput.Control :class="styles.Control">
      <DateInput.SegmentGroup :class="styles.Input">
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
