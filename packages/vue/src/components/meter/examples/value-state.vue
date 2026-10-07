<script setup lang="ts">
import { Meter } from '@ark-ui/vue/meter'
import styles from 'styles/meter.module.css'

const servers = [
  { name: 'api-1', load: 32 },
  { name: 'api-2', load: 68 },
  { name: 'api-3', load: 91 },
]
</script>

<template>
  <div :class="styles.Stack">
    <Meter.Root
      v-for="server in servers"
      :key="server.name"
      :class="[styles.Root, styles.Graded]"
      :defaultValue="server.load"
      :low="50"
      :high="80"
      :optimum="0"
    >
      <Meter.Label :class="styles.Label">{{ server.name }}</Meter.Label>
      <Meter.ValueText :class="styles.ValueText" />
      <Meter.Track :class="styles.Track">
        <Meter.Indicator :class="styles.Indicator" />
      </Meter.Track>
    </Meter.Root>
  </div>
</template>
