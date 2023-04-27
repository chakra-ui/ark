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
} from './'
import './range-slider.css'

const valuesRef = ref([-20, 20])

const outputRef = ref<{ context: RangeSliderContext }>()
</script>
<template>
  <RangeSlider :min="-50" :max="50" v-model="valuesRef">
    <RangeSliderLabel>Label</RangeSliderLabel>
    <RangeSliderOutput ref="outputRef">
      {{ outputRef?.context.value.join(' ') }}
    </RangeSliderOutput>
    <RangeSliderControl>
      <RangeSliderTrack>
        <RangeSliderRange />
      </RangeSliderTrack>
      <RangeSliderThumb v-for="(_, idx) in valuesRef" :key="idx" :index="idx" />
    </RangeSliderControl>
    <RangeSliderMarkerGroup>
      <RangeSliderMarker :value="-30">*</RangeSliderMarker>
      <RangeSliderMarker :value="0">*</RangeSliderMarker>
      <RangeSliderMarker :value="30">*</RangeSliderMarker>
    </RangeSliderMarkerGroup>
  </RangeSlider>
</template>
