<script setup lang="ts">
import { DateInput } from '@ark-ui/vue/date-input'
import { Field } from '@ark-ui/vue/field'
import styles from 'styles/date-input.module.css'
import field from 'styles/field.module.css'
</script>

<template>
  <Field.Root :class="field.Root">
    <DateInput.Root name="birthDate" :class="styles.Root">
      <DateInput.Label :class="styles.Label">Birth Date</DateInput.Label>
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
    <Field.HelperText :class="field.HelperText">Additional Info</Field.HelperText>
    <Field.ErrorText :class="field.ErrorText">Error Message</Field.ErrorText>
  </Field.Root>
</template>
