<script setup lang="ts">
import { Slider } from '@ark-ui/vue/slider'
</script>

<template>
  <Slider.Root
    @value-change="(details) => console.log(details.value)"
    @value-change-end="(details) => console.log(details.value)"
  >
    <Slider.Label>Label</Slider.Label>
    <Slider.ValueText />
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb :index="0">
        <Slider.HiddenInput />
      </Slider.Thumb>
    </Slider.Control>
  </Slider.Root>
</template>
