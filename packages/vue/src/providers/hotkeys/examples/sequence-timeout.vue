<script setup lang="ts">
import { HotkeysProvider } from '@ark-ui/vue/hotkeys'
import SequenceTimeoutDemo from './sequence-timeout-demo.vue'
</script>

<template>
  <HotkeysProvider :sequence-timeout-ms="600">
    <SequenceTimeoutDemo />
  </HotkeysProvider>
</template>
