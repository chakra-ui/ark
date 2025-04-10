<script setup lang="ts">
import { EnvironmentProvider } from '@ark-ui/vue/environment'
</script>

<template>
  <iframe title="IFrame Context">
    <EnvironmentProvider><!-- Your App --></EnvironmentProvider>
  </iframe>
</template>
