<script setup lang="ts">
import { useEnvironmentContext } from '@ark-ui/vue/environment'

const environment = useEnvironmentContext()
</script>

<template>
  <pre>{{ JSON.stringify(environment?.getRootNode(), null, 2) }}</pre>
</template>
