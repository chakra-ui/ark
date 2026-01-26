<script setup lang="ts">
import { Slider } from '@ark-ui/vue/slider'
import styles from 'styles/slider.module.css'

const marks = [0, 25, 50, 75, 100]
</script>

<template>
  <Slider.Root :class="styles.Root" :default-value="[50]">
    <div :style="{ display: 'flex', justifyContent: 'space-between' }">
      <Slider.Label :class="styles.Label">Label</Slider.Label>
      <Slider.ValueText :class="styles.ValueText" />
    </div>
    <Slider.Control :class="styles.Control">
      <Slider.Track :class="styles.Track">
        <Slider.Range :class="styles.Range" />
      </Slider.Track>
      <Slider.Thumb :index="0" :class="styles.Thumb">
        <Slider.HiddenInput />
      </Slider.Thumb>
    </Slider.Control>
    <Slider.MarkerGroup :class="styles.MarkerGroup">
      <Slider.Marker v-for="value in marks" :key="value" :value="value" :class="styles.Marker">
        {{ value }}
      </Slider.Marker>
    </Slider.MarkerGroup>
  </Slider.Root>
</template>
