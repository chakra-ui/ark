<script setup lang="ts">
import { Format } from '../..'

const value = 1450.45
const unit = 'bit'
</script>

<template>
  <div>
    File size: <Format.Byte :value="value" :unit="unit" />
  </div>
</template>
