<script setup lang="ts">
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
</script>
<template>
  <RangeSlider dir="rtl" :min="0" :max="100" :defaultValue="[33, 66]">
    <RangeSliderLabel>Label</RangeSliderLabel>
    <RangeSliderOutput v-slot="{ value }: RangeSliderContext">
      {{ value.join(' ') }}
    </RangeSliderOutput>
    <RangeSliderControl>
      <RangeSliderTrack>
        <RangeSliderRange />
      </RangeSliderTrack>
      <RangeSliderThumb v-for="(_, idx) in [0, 1]" :key="idx" :index="idx" />
    </RangeSliderControl>
    <RangeSliderMarkerGroup>
      <RangeSliderMarker :value="-30">*</RangeSliderMarker>
      <RangeSliderMarker :value="0">*</RangeSliderMarker>
      <RangeSliderMarker :value="30">*</RangeSliderMarker>
    </RangeSliderMarkerGroup>
  </RangeSlider>
</template>
