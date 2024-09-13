<script setup lang="ts">
import { Format } from '../..'
</script>

<template>
  <Format.Number :value="1234.45" style="currency" currency="USD" />
</template>
