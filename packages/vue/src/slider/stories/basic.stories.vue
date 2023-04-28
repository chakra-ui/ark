<script setup lang="ts">
import { ref } from 'vue'
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderOutput,
  type SliderProps,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '../'
import '../slider.css'

const sliderValue = ref<SliderProps['modelValue']>(30)

const testProps = defineProps(['modelValue', 'orientation', 'dir'])
</script>
<template>
  <Story title="Slider - Basic">
    <Slider :min="-50" :max="50" v-model="sliderValue" v-bind="testProps">
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
  </Story>
</template>
