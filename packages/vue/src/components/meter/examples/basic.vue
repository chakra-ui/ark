<script setup lang="ts">
import { Meter } from '@ark-ui/vue/meter'
import styles from 'styles/meter.module.css'
</script>

<template>
  <Meter.Root :class="styles.Root" :defaultValue="24">
    <Meter.Label :class="styles.Label">Storage used</Meter.Label>
    <Meter.ValueText :class="styles.ValueText" />
    <Meter.Track :class="styles.Track">
      <Meter.Indicator :class="styles.Indicator" />
    </Meter.Track>
  </Meter.Root>
</template>
