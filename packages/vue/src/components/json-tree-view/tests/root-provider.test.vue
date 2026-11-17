<script setup lang="ts">
import { JsonTreeView, useJsonTreeView } from '@ark-ui/vue/json-tree-view'
import { computed, ref } from 'vue'

const data = ref<object>({ original: 1 })
const jsonTreeView = useJsonTreeView(computed(() => ({ data: data.value })))
</script>

<template>
  <JsonTreeView.RootProvider :value="jsonTreeView">
    <JsonTreeView.Tree />
  </JsonTreeView.RootProvider>
  <button type="button" @click="data = { replaced: true }">replace</button>
</template>
