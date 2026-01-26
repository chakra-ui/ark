<script setup lang="ts">
import { Slider } from '@ark-ui/vue/slider'
import styles from 'styles/slider.module.css'
</script>

<template>
  <Slider.Root :class="styles.Root" :default-value="[40]">
    <Slider.Context v-slot="context">
      <div :style="{ display: 'flex', justifyContent: 'space-between' }">
        <Slider.Label :class="styles.Label">Dragging: {{ String(context.dragging) }}</Slider.Label>
        <span :class="styles.ValueText">{{ context.value.join(', ') }}</span>
      </div>
    </Slider.Context>
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
