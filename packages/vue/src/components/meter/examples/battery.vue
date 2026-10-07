<script setup lang="ts">
import { Meter } from '@ark-ui/vue/meter'
import { ZapIcon } from 'lucide-vue-next'
import styles from 'styles/meter.module.css'
</script>

<template>
  <Meter.Root
    :class="[styles.Battery, styles.Graded]"
    :defaultValue="18"
    :low="20"
    :high="50"
    :optimum="100"
    aria-label="Battery remaining"
  >
    <Meter.Track :class="styles.Track">
      <Meter.Indicator :class="styles.Indicator" />
    </Meter.Track>
    <Meter.ValueText :class="styles.ValueText" />
    <ZapIcon />
  </Meter.Root>
</template>
