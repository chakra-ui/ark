<script setup lang="ts">
import { DateInput } from '@ark-ui/vue/date-input'
</script>

<template>
  <DateInput.Root>
    <DateInput.Label>Date</DateInput.Label>
    <DateInput.Control>
      <DateInput.SegmentGroup>
        <DateInput.Context v-slot="api">
          <DateInput.Segment
            v-for="(segment, index) in api.getSegments()"
            :key="`${segment.type}-${index}`"
            :segment="segment"
            :index="index"
          />
        </DateInput.Context>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
</template>
