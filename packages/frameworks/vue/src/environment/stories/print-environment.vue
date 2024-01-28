<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEnvironmentContext, type EnvironmentContext } from '../'

const getRootNode = useEnvironmentContext()

const rootNode = ref<ReturnType<NonNullable<EnvironmentContext>> | undefined>(undefined)

onMounted(() => {
  rootNode.value = getRootNode?.()
  console.log('rootNode.value', rootNode.value)
})
</script>
<template>
  <pre aria-label="environment values">{{ JSON.stringify(rootNode, null, 2) }}</pre>
</template>
