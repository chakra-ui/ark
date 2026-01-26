<script setup lang="ts">
import { AngleSlider } from '@ark-ui/vue/angle-slider'
import { ref } from 'vue'
import styles from 'styles/angle-slider.module.css'

const value = ref(45)
</script>

<template>
  <AngleSlider.Root :class="styles.Root" :model-value="value" @value-change="(e) => (value = e.value)">
    <AngleSlider.Label :class="styles.Label">Rotation</AngleSlider.Label>
    <AngleSlider.Control :class="styles.Control">
      <AngleSlider.MarkerGroup :class="styles.MarkerGroup">
        <AngleSlider.Marker
          v-for="v in [0, 45, 90, 135, 180, 225, 270, 315]"
          :key="v"
          :value="v"
          :class="styles.Marker"
        />
      </AngleSlider.MarkerGroup>
      <AngleSlider.Thumb :class="styles.Thumb" />
    </AngleSlider.Control>
    <AngleSlider.ValueText :class="styles.ValueText" />
    <AngleSlider.HiddenInput />
  </AngleSlider.Root>
</template>
