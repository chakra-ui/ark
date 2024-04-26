<script setup lang="ts">
import { useEnvironmentContext } from '../'

const env = useEnvironmentContext()
</script>

<template>
  <pre aria-label="environment values">{{ JSON.stringify(env?.getRootNode?.(), null, 2) }}</pre>
</template>
