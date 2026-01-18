<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'
import styles from 'styles/format.module.css'
</script>

<template>
  <div :class="styles.Root">
    <span :class="styles.ValueLarge">
      <Format.Number :value="1500000" notation="compact" compact-display="short" />
    </span>
    <span :class="styles.Label">downloads per month</span>
  </div>
</template>
