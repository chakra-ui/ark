<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'

const value = 1450.45
</script>

<template>
  <div>
    File size:
    <Format.Byte :value="value" />
  </div>
</template>
