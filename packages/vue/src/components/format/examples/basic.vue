<script setup lang="ts">
import { Format } from '../..'
</script>

<template>
  <p>
    <Format.Byte :value="120904" unit="byte" unit-display="short" />
  </p>
  <p>
    <Format.Number :value="1204" unit="centimeter" />
  </p>
</template>
