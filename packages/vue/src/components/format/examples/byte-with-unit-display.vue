<script setup lang="ts">
import { Format } from '../..'

const value = 50345.53
const unitDisplays = ['narrow', 'short', 'long'] as const
</script>

<template>
  <div>
    <Format.Byte
      v-for="unitDisplay in unitDisplays"
      :key="unitDisplay"
      :value="value"
      :unit-display="unitDisplay"
    />
  </div>
</template>
