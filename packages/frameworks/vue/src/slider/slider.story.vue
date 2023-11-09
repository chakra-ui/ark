<script setup lang="ts">
import { ref } from 'vue'
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderValueText,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '../'
import './slider.css'

const sliderValue = ref([30])
</script>
<template>
  <Story title="Slider">
    <Variant title="Basic">
      <Slider>
        <SliderLabel>Label</SliderLabel>
        <SliderValueText />
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb />
        </SliderControl>
        <SliderMarkerGroup>
          <SliderMarker :value="0">0</SliderMarker>
          <SliderMarker :value="50">50</SliderMarker>
          <SliderMarker :value="100">100</SliderMarker>
        </SliderMarkerGroup>
      </Slider>
    </Variant>
    <Variant title="Controlled">
      <Slider :min="-50" :max="50" v-model="sliderValue">
        <SliderLabel>Label</SliderLabel>
        <SliderValueText />
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
    </Variant>
  </Story>
</template>
