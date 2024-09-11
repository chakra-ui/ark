<script setup lang="ts">
import { Format } from '../..'

const byteSizes = [50, 5000, 5000000, 5000000000]
</script>

<template>
  <div>
    <div v-for="(size, index) in byteSizes" :key="index">
      <Format.Byte :value="size" />
    </div>
  </div>
</template>
