<script setup lang="ts">
import { Meter } from '@ark-ui/vue/meter'
import styles from 'styles/meter.module.css'

const messages = {
  optimal: 'Plenty of space left',
  suboptimal: 'Running low on space',
  'least-optimal': 'Almost out of space',
}
</script>

<template>
  <Meter.Root :class="[styles.Root, styles.Graded]" :defaultValue="86" :low="60" :high="85" :optimum="0">
    <Meter.Label :class="styles.Label">Disk usage</Meter.Label>
    <Meter.ValueText :class="styles.ValueText" />
    <Meter.Track :class="styles.Track">
      <Meter.Indicator :class="styles.Indicator" />
    </Meter.Track>
    <Meter.Context v-slot="meter">
      <span :class="[styles.Hint, styles.Status]" :data-state="meter.valueState">
        {{ messages[meter.valueState] }}
      </span>
    </Meter.Context>
  </Meter.Root>
</template>
