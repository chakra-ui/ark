<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'
</script>

<template>
  <div>
    <p>
      Decimal (1000 bytes):
      <Format.Byte :value="1024" unit-system="decimal" />
    </p>
    <p>
      Binary (1024 bytes):
      <Format.Byte :value="1024" unit-system="binary" />
    </p>
  </div>
</template>
