<script setup lang="ts">
import { Volume, VolumeOff } from 'lucide-vue-next'
import { Toggle } from '../'
</script>

<template>
  <Toggle.Root>
    <Toggle.Indicator>
      <template #fallback>
        <Volume />
      </template>
      <VolumeOff />
    </Toggle.Indicator>
  </Toggle.Root>
</template>
