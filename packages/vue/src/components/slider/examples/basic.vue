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
      <Slider.Thumb :index="0" />
    </Slider.Control>
  </Slider.Root>
</template>
