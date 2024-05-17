<script setup lang="ts">
import { EnvironmentProvider } from '..'
import Usage from './usage.vue'
</script>

<template>
  <EnvironmentProvider>
    <Usage />
  </EnvironmentProvider>
</template>
