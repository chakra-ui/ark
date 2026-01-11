<script setup lang="ts">
import { Slider } from '@ark-ui/vue/slider'
import styles from 'styles/slider.module.css'
</script>

<template>
  <Slider.Root :default-value="[30, 60]" :class="styles.Root">
    <Slider.Label :class="styles.Label">Label</Slider.Label>
    <Slider.Control :class="styles.Control">
      <Slider.Track :class="styles.Track">
        <Slider.Range :class="styles.Range" />
      </Slider.Track>
      <Slider.Thumb :index="0" :class="styles.Thumb">
        <Slider.HiddenInput />
      </Slider.Thumb>
      <Slider.Thumb :index="1" :class="styles.Thumb">
        <Slider.HiddenInput />
      </Slider.Thumb>
    </Slider.Control>
  </Slider.Root>
</template>
