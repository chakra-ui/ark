<script setup lang="ts">
import { useEnvironmentContext } from '../'

const env = useEnvironmentContext()
</script>

<template>
  <pre data-testid="output">{{ JSON.stringify(env?.getRootNode(), null, 2) }}</pre>
</template>
