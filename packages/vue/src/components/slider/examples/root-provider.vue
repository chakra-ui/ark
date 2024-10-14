<script setup lang="ts">
import { Slider, useSlider } from '@ark-ui/vue/slider'

const slider = useSlider()
</script>

<template>
  <button @click="slider.focus()">Focus</button>

  <Slider.RootProvider :value="slider">
    <Slider.Label>Label</Slider.Label>
    <Slider.ValueText />
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb :index="0" />
    </Slider.Control>
  </Slider.RootProvider>
</template>
