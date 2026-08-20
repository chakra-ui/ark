<script setup lang="ts">
import { HotkeysProvider } from '@ark-ui/vue/hotkeys'
import ScopeDemo from './scope-demo.vue'
</script>

<template>
  <HotkeysProvider :active-scopes="['editor']">
    <ScopeDemo />
  </HotkeysProvider>
</template>
