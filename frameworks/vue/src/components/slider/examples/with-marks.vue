<script setup lang="ts">
import { Slider } from '../..'
</script>

<template>
  <Slider.Root>
    <Slider.Label>Label</Slider.Label>
    <Slider.ValueText />
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb :key="0" :index="0" />
    </Slider.Control>
    <Slider.MarkerGroup>
      <Slider.Marker :value="0">0</Slider.Marker>
      <Slider.Marker :value="25">*</Slider.Marker>
      <Slider.Marker :value="50">50</Slider.Marker>
      <Slider.Marker :value="75">*</Slider.Marker>
    </Slider.MarkerGroup>
  </Slider.Root>
</template>
