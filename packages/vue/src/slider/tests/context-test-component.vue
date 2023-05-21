<script setup lang="ts">
import { ref } from 'vue'
import { Slider, SliderOutput, type SliderContext } from '../index'

const valueRef = ref(22)
</script>
<template>
  <Slider :min="-50" :max="50" v-model="valueRef" v-slot="{ value }: SliderContext">
    <div data-testid="slider-value">
      {{ value }}
    </div>
    <SliderOutput v-slot="{ value }: SliderContext">
      <div data-testid="slider-output-value">
        {{ value }}
      </div>
    </SliderOutput>
  </Slider>
</template>
