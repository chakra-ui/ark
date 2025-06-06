<script setup lang="ts">
import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from '@ark-ui/vue/environment'

const environment = useEnvironmentContext(DEFAULT_ENVIRONMENT)
</script>

<template>
  <pre>{{ JSON.stringify(environment.getRootNode(), null, 2) }}</pre>
</template>
