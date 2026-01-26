<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'
import styles from 'styles/format.module.css'
</script>

<template>
  <span :class="styles.Value">
    <Format.Number :value="0.145" style="percent" :maximum-fraction-digits="2" :minimum-fraction-digits="2" />
  </span>
</template>
