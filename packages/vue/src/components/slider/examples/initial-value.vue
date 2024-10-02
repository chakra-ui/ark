<script setup lang="ts">
import { Slider } from '@ark-ui/vue/slider'
</script>

<template>
  <Slider.Root :model-value="[42]">
    <Slider.Label>Label</Slider.Label>
    <Slider.ValueText />
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb :key="0" :index="0" />
    </Slider.Control>
    <Slider.MarkerGroup>
      <Slider.Marker :value="0">*</Slider.Marker>
      <Slider.Marker :value="30">*</Slider.Marker>
      <Slider.Marker :value="60">*</Slider.Marker>
    </Slider.MarkerGroup>
  </Slider.Root>
</template>
