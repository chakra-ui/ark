<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'
import styles from 'styles/format.module.css'
</script>

<template>
  <div :class="styles.Root">
    <span :class="styles.Label">File size</span>
    <span :class="styles.Value">
      <Format.Byte :value="120000" />
    </span>
  </div>
</template>
