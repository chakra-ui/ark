<script setup lang="ts">
import { JsonTreeView } from '@ark-ui/vue/json-tree-view'
import { ChevronRightIcon } from 'lucide-vue-next'

const data = {
  regex: /^[a-z0-9]+/g,
  case_insensitive: /^(?:[a-z0-9]+)foo.*?/i,
}
</script>

<template>
  <JsonTreeView.Root :data="data">
    <JsonTreeView.Tree>
      <template #arrow>
        <ChevronRightIcon />
      </template>
    </JsonTreeView.Tree>
  </JsonTreeView.Root>
</template>
