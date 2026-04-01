<script setup lang="ts">
import { DateInput } from '@ark-ui/vue/date-input'
import { parseDate } from '@internationalized/date'
import { ref } from 'vue'
import styles from 'styles/date-input.module.css'

const shouldForceLeadingZeros = ref(true)
</script>

<template>
  <div class="stack">
    <label :class="styles.CheckboxLabel">
      <input v-model="shouldForceLeadingZeros" :class="styles.Checkbox" type="checkbox" />
      Force leading zeros
    </label>
    <DateInput.Root
      :class="styles.Root"
      :default-value="[parseDate('2024-06-05')]"
      :should-force-leading-zeros="shouldForceLeadingZeros"
    >
      <DateInput.Label :class="styles.Label">Date</DateInput.Label>
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
  </div>
</template>
