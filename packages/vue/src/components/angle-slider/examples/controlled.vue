<script setup lang="ts">
import { AngleSlider } from '@ark-ui/vue/angle-slider'
import { ref } from 'vue'

const angle = ref(180)
</script>

<template>
  <AngleSlider.Root v-model="angle">
    <AngleSlider.Label>Temperature</AngleSlider.Label>
    <AngleSlider.Control>
      <AngleSlider.Thumb />
      <AngleSlider.MarkerGroup>
        <AngleSlider.Marker v-for="(value, i) in [0, 45, 90, 135, 180, 225, 270, 315]" :key="i" :value="value" />
      </AngleSlider.MarkerGroup>
    </AngleSlider.Control>
    <AngleSlider.ValueText>{{ angle }} ºC</AngleSlider.ValueText>
    <AngleSlider.HiddenInput />
  </AngleSlider.Root>
</template>
