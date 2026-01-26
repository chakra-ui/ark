<script setup lang="ts">
import { Slider } from '@ark-ui/vue/slider'
import styles from 'styles/slider.module.css'
</script>

<template>
  <Slider.Root origin="center" :class="styles.Root" :default-value="[75]">
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
  </Slider.Root>
</template>
