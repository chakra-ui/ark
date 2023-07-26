<script setup lang="ts">
import { ref } from 'vue'
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderOutput,
  SliderRange,
  SliderThumb,
  SliderTrack,
  type SliderProps,
} from '../'
import '../slider.css'

const sliderValue = ref<SliderProps['modelValue']>(30)
</script>
<template>
  <Slider :min="-50" :max="50" v-model="sliderValue">
    <SliderLabel>Label</SliderLabel>
    <SliderOutput>{{ sliderValue }}</SliderOutput>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
    </SliderControl>
    <SliderMarkerGroup>
      <SliderMarker :value="-30">-30</SliderMarker>
      <SliderMarker :value="0">0</SliderMarker>
      <SliderMarker :value="30">30</SliderMarker>
    </SliderMarkerGroup>
  </Slider>
</template>
