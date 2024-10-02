<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'
</script>

<template>
  <Format.Number
    :value="0.145"
    style="percent"
    :maximum-fraction-digits="2"
    :minimum-fraction-digits="2"
  />
</template>
