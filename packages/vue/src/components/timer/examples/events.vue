<script setup lang="ts">
import { Timer } from '../..'
</script>

<template>
  <Timer.Root
    :targetMs="5 * 1000"
    @complete="() => console.log('Timer completed')"
    @tick="(details) => console.log('Tick:', details.formattedTime)"
  >
    <Timer.Item type="seconds" />
  </Timer.Root>
</template>
