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
} from './'
import './range-slider.css'

const value = ref([-20, 20])
</script>
<template>
  <Story title="RangeSlider">
    <Variant title="Basic">
      <RangeSlider :min="-50" :max="50" v-model="value">
        <RangeSliderLabel>Label</RangeSliderLabel>
        <RangeSliderOutput>
          {{ value.join(',') }}
        </RangeSliderOutput>
        <RangeSliderControl>
          <RangeSliderTrack>
            <RangeSliderRange />
          </RangeSliderTrack>
          <RangeSliderThumb v-for="(_, idx) in value" :key="idx" :index="idx" />
        </RangeSliderControl>
        <RangeSliderMarkerGroup>
          <RangeSliderMarker :value="-30">30</RangeSliderMarker>
          <RangeSliderMarker :value="0">0</RangeSliderMarker>
          <RangeSliderMarker :value="30">30</RangeSliderMarker>
        </RangeSliderMarkerGroup>
      </RangeSlider>
    </Variant>
  </Story>
</template>
