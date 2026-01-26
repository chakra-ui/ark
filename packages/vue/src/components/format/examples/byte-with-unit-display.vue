<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'
import styles from 'styles/format.module.css'

const unitDisplays = ['narrow', 'short', 'long'] as const
</script>

<template>
  <div :class="styles.List">
    <div v-for="unitDisplay in unitDisplays" :key="unitDisplay" :class="styles.ListItem">
      <span :class="styles.InlineLabel">{{ unitDisplay }}:</span>
      <span :class="styles.Value">
        <Format.Byte :value="50345.53" :unit-display="unitDisplay" />
      </span>
    </div>
  </div>
</template>
