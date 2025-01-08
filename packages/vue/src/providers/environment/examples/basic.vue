<script setup lang="ts">
import { EnvironmentProvider } from '@ark-ui/vue/environment'
import Usage from './usage.vue' /* PartiallyEnd: #3632/scriptSetup.vue */
import Usage from './usage.vue'
</script>

<template>
  <EnvironmentProvider>
    <Usage />
  </EnvironmentProvider>
</template>
