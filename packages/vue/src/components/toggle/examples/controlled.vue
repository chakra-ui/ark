<script setup lang="ts">
import { Volume, VolumeOff } from 'lucide-vue-next'
import { ref } from 'vue'
import { Toggle } from '../'

const pressed = ref(false)
</script>

<template>
  <div>
    <Toggle.Root v-model="pressed">
      <component :is="pressed ? Volume : VolumeOff" />
    </Toggle.Root>
    <p>Volume is {{ pressed ? 'unmuted' : 'muted' }}</p>
  </div>
</template>
