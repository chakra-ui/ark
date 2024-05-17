<script setup lang="ts">
import { EnvironmentProvider } from '../'
</script>

<template>
  <iframe title="IFrame Context">
    <EnvironmentProvider><!-- Your App --></EnvironmentProvider>
  </iframe>
</template>
