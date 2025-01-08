<script setup lang="ts">
import { Toggle } from '@ark-ui/vue/toggle'
import { Volume, VolumeOff } from 'lucide-vue-next' /* PartiallyEnd: #3632/scriptSetup.vue */
import { Volume, VolumeOff } from 'lucide-vue-next'
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
