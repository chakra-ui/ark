<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { EnvironmentContext, useEnvironmentContext } from '../environment-context'

const getRootNode = useEnvironmentContext()

const rootNode = ref<ReturnType<NonNullable<EnvironmentContext>> | undefined>(undefined)

watchEffect(() => {
  rootNode.value = getRootNode?.()

  console.log(rootNode.value)
})
</script>
<template>
  <pre aria-label="environment values">{{ JSON.stringify(rootNode, null, 2) }}</pre>
</template>
