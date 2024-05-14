<script setup lang="ts">
import { Slider } from '../..'
</script>

<template>
  <Slider.Root :min="-10" :max="10">
    <Slider.Label>Label</Slider.Label>
    <Slider.ValueText />
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb :key="0" :index="0" />
    </Slider.Control>
  </Slider.Root>
</template>
