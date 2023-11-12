<script setup lang="ts">
import { ref } from 'vue'
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderThumb,
  SliderTrack,
  SliderValueText,
} from '../'

const sliderValue = ref([0])
</script>
<template>
  <Slider :min="-50" :max="50" v-model="sliderValue">
    <SliderLabel>Label</SliderLabel>
    <SliderValueText />>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb :index="0" />
    </SliderControl>
    <SliderMarkerGroup>
      <SliderMarker :value="-30">-30</SliderMarker>
      <SliderMarker :value="0">0</SliderMarker>
      <SliderMarker :value="30">30</SliderMarker>
    </SliderMarkerGroup>
  </Slider>
</template>
