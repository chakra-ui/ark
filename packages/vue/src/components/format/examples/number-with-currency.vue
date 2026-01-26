<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'
import styles from 'styles/format.module.css'
</script>

<template>
  <span :class="styles.Value">
    <Format.Number :value="1234.45" style="currency" currency="USD" />
  </span>
</template>
