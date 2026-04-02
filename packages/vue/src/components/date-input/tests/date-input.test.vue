<script setup lang="ts">
import { DateInput, type DateInputRootEmits, type DateInputRootProps } from '..'
import { useForwardPropsEmits } from '../../..'

const props = defineProps<DateInputRootProps>()
const emits = defineEmits<DateInputRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <DateInput.Root v-bind="localProps">
    <DateInput.Label>Date</DateInput.Label>
    <DateInput.Control>
      <DateInput.SegmentGroup>
        <DateInput.SegmentContext v-slot="segment">
          <DateInput.Segment :segment="segment" />
        </DateInput.SegmentContext>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
</template>
