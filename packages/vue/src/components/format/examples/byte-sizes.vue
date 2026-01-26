<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'
import styles from 'styles/format.module.css'

const byteSizes = [50, 5000, 5000000, 5000000000]
</script>

<template>
  <div :class="styles.List">
    <div v-for="size in byteSizes" :key="size" :class="styles.ListItem">
      <span :class="styles.Value">
        <Format.Byte :value="size" />
      </span>
    </div>
  </div>
</template>
