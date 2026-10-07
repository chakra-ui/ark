<script setup lang="ts">
import { Meter } from '@ark-ui/vue/meter'
import styles from 'styles/meter.module.css'
</script>

<template>
  <Meter.Root
    :class="styles.Root"
    :defaultValue="3"
    :max="5"
    :translations="{ value: ({ value, max }) => `${value} of ${max} tasks` }"
  >
    <Meter.Label :class="styles.Label">Onboarding</Meter.Label>
    <Meter.ValueText :class="styles.ValueText" />
    <Meter.Track :class="styles.Track">
      <Meter.Indicator :class="styles.Indicator" />
    </Meter.Track>
  </Meter.Root>
</template>
