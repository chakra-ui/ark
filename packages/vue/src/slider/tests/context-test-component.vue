<script setup lang="ts">
import { ref } from 'vue'
import { Slider, SliderOutput, UseSliderReturn } from '../index'

const valueRef = ref(22)
const sliderRef = ref<{ context: UseSliderReturn }>()
const sliderOutputRef = ref<{ context: UseSliderReturn }>()
</script>
<template>
  <Slider ref="sliderRef" :min="-50" :max="50" v-model="valueRef">
    <div data-testid="slider-value">
      {{ sliderRef?.context.value }}
    </div>
    <SliderOutput ref="sliderOutputRef">
      <div data-testid="slider-output-value">
        {{ sliderOutputRef?.context.value }}
      </div>
    </SliderOutput>
  </Slider>
</template>
