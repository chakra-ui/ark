<script setup lang="ts">
import { AngleSlider } from '@ark-ui/vue/angle-slider'
import styles from 'styles/angle-slider.module.css'
</script>

<template>
  <AngleSlider.Root :class="styles.Root" :step="15">
    <AngleSlider.Label :class="styles.Label">15 Step</AngleSlider.Label>
    <AngleSlider.Control :class="styles.Control">
      <AngleSlider.MarkerGroup :class="styles.MarkerGroup">
        <AngleSlider.Marker
          v-for="value in [0, 45, 90, 135, 180, 225, 270, 315]"
          :key="value"
          :value="value"
          :class="styles.Marker"
        />
      </AngleSlider.MarkerGroup>
      <AngleSlider.Thumb :class="styles.Thumb" />
    </AngleSlider.Control>
    <AngleSlider.ValueText :class="styles.ValueText" />
    <AngleSlider.HiddenInput />
  </AngleSlider.Root>
</template>
