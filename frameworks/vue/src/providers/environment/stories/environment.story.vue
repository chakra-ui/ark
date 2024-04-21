<script setup lang="ts">
import { Environment } from '../'
import PrintEnvironment from './print-environment.vue'
</script>

<template>
  <iframe>
    <Environment>
      <PrintEnvironment />
    </Environment>
  </iframe>
</template>
