<script setup lang="ts">
import { Toggle } from '@ark-ui/vue/toggle'
import { Bold } from 'lucide-vue-next'
</script>

<template>
  <Toggle.Root>
    <Bold />
    <Toggle.Context v-slot="toggle">
      <span>State: {{ toggle.pressed ? 'pressed' : 'not pressed' }}</span>
    </Toggle.Context>
  </Toggle.Root>
</template>
