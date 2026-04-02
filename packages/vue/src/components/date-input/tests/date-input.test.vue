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
