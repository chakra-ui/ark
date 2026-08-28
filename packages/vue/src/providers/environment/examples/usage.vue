<script setup lang="ts">
import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from '@ark-ui/vue/environment'

const environment = useEnvironmentContext(DEFAULT_ENVIRONMENT)
</script>

<template>
  <pre>Root node: {{ environment.getRootNode()?.nodeName }}</pre>
</template>
