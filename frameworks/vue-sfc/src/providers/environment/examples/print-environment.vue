<script setup lang="ts">
import { useEnvironmentContext } from '../'

const environment = useEnvironmentContext()
</script>
<template>
  <pre aria-label="environment values">{{ JSON.stringify(environment?.(), null, 2) }}</pre>
</template>
