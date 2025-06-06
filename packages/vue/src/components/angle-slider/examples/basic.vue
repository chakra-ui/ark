<script setup lang="ts">
import { AngleSlider } from '@ark-ui/vue/angle-slider'
</script>

<template>
  <AngleSlider.Root>
    <AngleSlider.Label>Wind direction</AngleSlider.Label>
    <AngleSlider.Control>
      <AngleSlider.Thumb />
      <AngleSlider.MarkerGroup>
        <AngleSlider.Marker v-for="(value, i) in [0, 45, 90, 135, 180, 225, 270, 315]" :key="i" :value="value" />
      </AngleSlider.MarkerGroup>
    </AngleSlider.Control>
    <AngleSlider.ValueText />
    <AngleSlider.HiddenInput />
  </AngleSlider.Root>
</template>
