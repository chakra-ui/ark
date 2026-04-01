<script setup lang="ts">
import { DateInput } from '@ark-ui/vue/date-input'
import { LocaleProvider } from '@ark-ui/vue/locale'
import styles from 'styles/date-input.module.css'
</script>

<template>
  <LocaleProvider locale="ar-SA">
    <DateInput.Root dir="rtl" :class="styles.Root">
      <DateInput.Label :class="styles.Label">التاريخ</DateInput.Label>
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
  </LocaleProvider>
</template>
