<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'
</script>

<template>
  <div>
    Edited
    <Format.RelativeTime :value="new Date('2025-05-05')" :style="'short'" />
  </div>
</template>
