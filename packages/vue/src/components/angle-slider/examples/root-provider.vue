<script setup lang="ts">
import { AngleSlider, useAngleSlider } from '@ark-ui/vue/angle-slider'
import button from 'styles/button.module.css'
import styles from 'styles/angle-slider.module.css'

const angleSlider = useAngleSlider()
</script>

<template>
  <div class="stack">
    <AngleSlider.RootProvider :class="styles.Root" :value="angleSlider">
      <AngleSlider.Label :class="styles.Label">Rotation</AngleSlider.Label>
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
    </AngleSlider.RootProvider>

    <button :class="button.Root" @click="angleSlider.setValue(90)">Set to 90</button>
  </div>
</template>
