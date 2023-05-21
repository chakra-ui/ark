<script setup lang="ts">
import { ref } from 'vue'
import {
  RangeSlider,
  RangeSliderControl,
  RangeSliderLabel,
  RangeSliderMarker,
  RangeSliderMarkerGroup,
  RangeSliderOutput,
  RangeSliderRange,
  RangeSliderThumb,
  RangeSliderTrack,
  type RangeSliderContext,
} from '../'
import '../range-slider.css'

// '../range-slider.test.tsx'
const testProps = defineProps(['dir', 'orientation'])

const values = ref([33, 66])
</script>
<template>
  <div>{{ values }}</div>
  <RangeSlider :min="0" :max="100" v-model="values" v-bind="testProps">
    <RangeSliderLabel>Label</RangeSliderLabel>
    <RangeSliderOutput v-slot="{ value }: RangeSliderContext">
      {{ value.join(' ') }}
    </RangeSliderOutput>
    <RangeSliderControl>
      <RangeSliderTrack>
        <RangeSliderRange />
      </RangeSliderTrack>
      <RangeSliderThumb v-for="(_, idx) in values" :key="idx" :index="idx" />
    </RangeSliderControl>
    <RangeSliderMarkerGroup>
      <RangeSliderMarker :value="30">*</RangeSliderMarker>
      <RangeSliderMarker :value="50">*</RangeSliderMarker>
      <RangeSliderMarker :value="70">*</RangeSliderMarker>
    </RangeSliderMarkerGroup>
  </RangeSlider>
</template>
