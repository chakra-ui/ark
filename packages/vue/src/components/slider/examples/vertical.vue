<script setup lang="ts">
import { Slider } from '@ark-ui/vue/slider'
</script>

<template>
  <Slider.Root orientation="vertical">
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
