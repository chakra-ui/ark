<script setup lang="ts">
import { JsonTreeView } from '@ark-ui/vue/json-tree-view'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <JsonTreeView.Root v-bind="$attrs" :data="$attrs.data as object">
    <JsonTreeView.Tree />
  </JsonTreeView.Root>
</template>
