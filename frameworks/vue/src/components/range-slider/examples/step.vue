<script setup lang="ts">
import { Slider } from '../..'
</script>

<template>
  <Slider.Root :step="0.01" :min="5" :max="10" :model-value="[7.5, 8]">
    <Slider.Label>Label</Slider.Label>
    <Slider.ValueText />
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb :key="0" :index="0" />
      <Slider.Thumb :key="1" :index="1" />
    </Slider.Control>
  </Slider.Root>
</template>
