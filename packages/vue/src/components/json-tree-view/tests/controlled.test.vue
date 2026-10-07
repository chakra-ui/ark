<script setup lang="ts">
import { JsonTreeView } from '@ark-ui/vue/json-tree-view'
import { ref } from 'vue'

const props = defineProps<{ data: object }>()

const data = ref(props.data)
const expandedValue = ref<string[]>([])
const selectedValue = ref<string[]>([])
</script>

<template>
  <JsonTreeView.Root :data="data" v-model:expanded-value="expandedValue" v-model:selected-value="selectedValue">
    <JsonTreeView.Tree />
  </JsonTreeView.Root>
  <output data-testid="expanded">{{ expandedValue.length }}</output>
  <output data-testid="selected">{{ selectedValue.length }}</output>
  <button type="button" @click="expandedValue = []">collapse</button>
  <button type="button" @click="data = { replaced: true }">replace</button>
</template>
