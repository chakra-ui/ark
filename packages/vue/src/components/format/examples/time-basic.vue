<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'
import styles from 'styles/format.module.css'
</script>

<template>
  <span :class="styles.Value">
    <Format.Time value="18:47:12" :format="'12h'" />
  </span>
</template>
